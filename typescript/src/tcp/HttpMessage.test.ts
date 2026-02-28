class HttpMessage {
  constructor(
    private _method: string,
    private _httpVersion: string
  ) {}

  static parse(messageAsString: string): HttpMessage {
    const lines = messageAsString.split('\r\n');
    const requestLine = lines[0];

    const splitRequestLine = requestLine.split(' ');

    if (splitRequestLine.length !== 3) throw new Error(`Invalid Request Line ${requestLine}`);

    const method = splitRequestLine[0];
    const httpVersion = splitRequestLine[2].split('/')[1];

    return new HttpMessage(method, httpVersion);
  }

  get method() {
    return this._method;
  }

  get version() {
    return this._httpVersion;
  }
}

describe('HttpMessage', () => {
  it('parses GET HTTP message', () => {
    const messageAsString = 'GET / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpMessage = HttpMessage.parse(messageAsString);
    expect(httpMessage.method).toEqual('GET');
    expect(httpMessage.version).toEqual('1.1');
  });

  it('parses POST HTTP message', () => {
    const messageAsString = 'POST / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpMessage = HttpMessage.parse(messageAsString);
    expect(httpMessage.method).toEqual('POST');
    expect(httpMessage.version).toEqual('1.1');
  });

  it('parses HTTP 1.2 message', () => {
    const messageAsString = 'POST / HTTP/1.2\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpMessage = HttpMessage.parse(messageAsString);
    expect(httpMessage.method).toEqual('POST');
    expect(httpMessage.version).toEqual('1.2');
  });

  it('throws Error when request line is invalid', () => {
    const messageAsString = 'POST/HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    expect(() => HttpMessage.parse(messageAsString)).toThrow();
  });
});
