class HttpRequest {
  constructor(
    private message: {
      method: string;
      httpVersion: string;
      uri: string;
      messageAsString: string;
      headers: Record<string, string>;
    }
  ) {}

  static parse(messageAsString: string): HttpRequest {
    const [requestLine, ...rest] = messageAsString.split('\r\n');

    const splitRequestLine = requestLine.split(' ');

    if (splitRequestLine.length !== 3) throw new Error(`Invalid Request Line ${requestLine}`);

    const method = splitRequestLine[0];
    const uri = splitRequestLine[1];
    const httpVersion = splitRequestLine[2].split('/')[1];

    const headers = parseHeaders(rest);

    return new HttpRequest({ method, httpVersion, uri, messageAsString, headers });
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
}

function parseHeaders(headerLines: string[]) {
  return headerLines.reduce(
    (result, line) => {
      const key = line.substring(0, line.indexOf(':')).toLowerCase();
      const value = line.substring(line.indexOf(' ') + 1);
      result[key] = value;
      return result;
    },
    {} as Record<string, string>
  );
}

describe('HttpRequest', () => {
  it('parses GET HTTP message', () => {
    const messageAsString = 'GET / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpRequest = HttpRequest.parse(messageAsString);
    expect(httpRequest.method).toEqual('GET');
    expect(httpRequest.uri).toEqual('/');
    expect(httpRequest.version).toEqual('1.1');
    expect(httpRequest.headers).toEqual({ host: 'localhost:3000', connection: 'keep-alive' });
    expect(httpRequest.toString()).toEqual(messageAsString);
  });

  it('parses POST HTTP message', () => {
    const messageAsString = 'POST / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpRequest = HttpRequest.parse(messageAsString);
    expect(httpRequest.method).toEqual('POST');
  });

  it('parses HTTP 1.2 message', () => {
    const messageAsString = 'POST / HTTP/1.2\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpRequest = HttpRequest.parse(messageAsString);
    expect(httpRequest.version).toEqual('1.2');
  });

  it('parses /cat/hello message', () => {
    const messageAsString = 'GET /cat/hello HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpRequest = HttpRequest.parse(messageAsString);
    expect(httpRequest.uri).toEqual('/cat/hello');
  });

  it('throws Error when request line is invalid', () => {
    const messageAsString = 'POST/HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    expect(() => HttpRequest.parse(messageAsString)).toThrow();
  });
});
