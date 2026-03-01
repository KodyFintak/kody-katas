class HttpResponse {
  constructor(private message: { httpVersion: number; status: number }) {}

  toString() {
    return `HTTP/${this.message.httpVersion} ${this.message.status}`;
  }
}

describe('HttpResponse', () => {
  it('creates HttpResponse', () => {
    const response = new HttpResponse({ httpVersion: 1.1, status: 200 });
    expect(response.toString()).toEqual('HTTP/1.1 200');
  });

  it('creates HttpResponse with 1.2 version', () => {
    const response = new HttpResponse({ httpVersion: 1.2, status: 200 });
    expect(response.toString()).toEqual('HTTP/1.2 200');
  });

  it('creates HttpResponse with 404', () => {
    const response = new HttpResponse({ httpVersion: 1.1, status: 404 });
    expect(response.toString()).toEqual('HTTP/1.1 404');
  });
});
