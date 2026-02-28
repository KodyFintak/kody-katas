class HttpMessage {
  static parse(messageAsString: string): HttpMessage {
    return new HttpMessage();
  }
}

describe('HttpMessage', () => {
  it('parses HTTP message', () => {
    const messageAsString = 'GET / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    const httpMessage = HttpMessage.parse(messageAsString);
    expect(httpMessage).toEqual(new HttpMessage());
  });
});
