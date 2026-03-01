class HttpResponse {
  constructor(private message: { httpVersion: number }) {}

  toString() {
    return `HTTP/${this.message.httpVersion}`;
  }
}

describe('HttpResponse', () => {
  it('creates HttpResponse', () => {
    const response = new HttpResponse({ httpVersion: 1.1 });
    expect(response.toString()).toEqual('HTTP/1.1');
  });

  it('creates HttpResponse with 1.2 version', () => {
    const response = new HttpResponse({ httpVersion: 1.2 });
    expect(response.toString()).toEqual('HTTP/1.2');
  });
});
