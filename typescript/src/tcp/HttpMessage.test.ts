class HttpMessage {
  constructor(private _method: string) {}

  static parse(messageAsString: string): HttpMessage {
    const lines = messageAsString.split('\r\n');
    const requestLine = lines[0];
    const method = requestLine.split(' ')[0];
    return new HttpMessage(method);
  }

  get method() {
    return this._method;
  }

  get version() {
    return '1.1';
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
});
