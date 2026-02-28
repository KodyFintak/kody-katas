class HttpMessage {
  constructor(private message: { method: string; httpVersion: string; uri: string; messageAsString: string }) {}

  static parse(messageAsString: string): HttpMessage {
    const lines = messageAsString.split('\r\n');
    const requestLine = lines[0];

    const splitRequestLine = requestLine.split(' ');

    if (splitRequestLine.length !== 3) throw new Error(`Invalid Request Line ${requestLine}`);

    const method = splitRequestLine[0];
    const uri = splitRequestLine[1];
    const httpVersion = splitRequestLine[2].split('/')[1];

    return new HttpMessage({ method, httpVersion, uri, messageAsString });
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
}

describe('HttpMessage', () => {
  it('parses GET HTTP message', () => {
    const messageAsString = 'GET / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpMessage = HttpMessage.parse(messageAsString);
    expect(httpMessage.method).toEqual('GET');
    expect(httpMessage.uri).toEqual('/');
    expect(httpMessage.version).toEqual('1.1');
    expect(httpMessage.toString()).toEqual(messageAsString);
  });

  it('parses POST HTTP message', () => {
    const messageAsString = 'POST / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpMessage = HttpMessage.parse(messageAsString);
    expect(httpMessage.method).toEqual('POST');
  });

  it('parses HTTP 1.2 message', () => {
    const messageAsString = 'POST / HTTP/1.2\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpMessage = HttpMessage.parse(messageAsString);
    expect(httpMessage.version).toEqual('1.2');
  });

  it('parses /cat/hello message', () => {
    const messageAsString = 'GET /cat/hello HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpMessage = HttpMessage.parse(messageAsString);
    expect(httpMessage.uri).toEqual('/cat/hello');
  });

  it('throws Error when request line is invalid', () => {
    const messageAsString = 'POST/HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    expect(() => HttpMessage.parse(messageAsString)).toThrow();
  });
});
