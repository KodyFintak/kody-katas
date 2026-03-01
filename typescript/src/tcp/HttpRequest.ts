export class HttpRequest {
  constructor(
    private message: {
      method: string;
      httpVersion: string;
      uri: string;
      messageAsString: string;
      headers: Record<string, string>;
      rawBody: string;
    }
  ) {}

  static parse(messageAsString: string): HttpRequest {
    const [requestLine, ...rest] = messageAsString.split('\r\n');

    const splitRequestLine = requestLine.split(' ');

    if (!messageAsString.includes('\r\n\r\n')) throw new Error('No Empty Line Between Headers and Body!');
    if (splitRequestLine.length !== 3) throw new Error(`Invalid Request Line ${requestLine}`);

    const method = splitRequestLine[0];
    const uri = splitRequestLine[1];
    const httpVersion = splitRequestLine[2].split('/')[1];

    const restAsOneLine = rest.join('\r\n');

    const headersAsString = restAsOneLine.substring(0, restAsOneLine.indexOf('\r\n\r\n'));
    const headers = parseHeaders(headersAsString.split('\r\n'));
    const rawBody = restAsOneLine.substring(restAsOneLine.indexOf('\r\n\r\n') + 4);

    return new HttpRequest({ method, httpVersion, uri, messageAsString, headers, rawBody });
  }

  get method() {
    return this.message.method;
  }

  get version() {
    return this.message.httpVersion;
  }

  get uri() {
    return this.message.uri;
  }

  toString() {
    return this.message.messageAsString;
  }

  get headers() {
    return this.message.headers;
  }

  get body() {
    return this.message.rawBody;
  }
  bodyAsObject() {
    return JSON.parse(this.message.rawBody);
  }
}

function parseHeaders(headerLines: string[]) {
  return headerLines.reduce(
    (result, line) => {
      const { key, value } = parseHeader(line);
      result[key] = value;
      return result;
    },
    {} as Record<string, string>
  );
}

function parseHeader(line: string) {
  const colon = line.indexOf(':');
  const key = line.slice(0, colon).toLowerCase();
  const value = line.slice(colon + 2);
  return { key, value };
}
