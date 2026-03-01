class HttpResponse {
  constructor(
    private message: { httpVersion: number; status: number; reasonPhrase?: string; headers?: Record<string, string>; body?: string }
  ) {}

  toString() {
    const statusLineAndHeaderLines = `${[this.statusLine(), ...this.headerLines()].join('\r\n')}\r\n\r\n`;
    if (this.message.body) return `${statusLineAndHeaderLines}${this.message.body}`;
    return statusLineAndHeaderLines;
  }

  private headerLines() {
    const headers = this.message.headers ?? {};
    return Object.entries(headers).map(([key, value]) => `${key}: ${value}`);
  }

  statusLine() {
    const statusLine = `HTTP/${this.message.httpVersion} ${this.message.status}`;
    if (this.message.reasonPhrase) return `${statusLine} ${this.message.reasonPhrase}`;
    return statusLine;
  }
}

describe('HttpResponse', () => {
  it('creates HttpResponse', () => {
    const response = new HttpResponse({
      httpVersion: 1.1,
      status: 200,
      headers: { 'content-type': 'text/plain', date: 'Tue, 29 Oct 2024 16:56:32 GMT' }
    });
    expect(response.toString()).toEqual('HTTP/1.1 200\r\ncontent-type: text/plain\r\ndate: Tue, 29 Oct 2024 16:56:32 GMT\r\n\r\n');
  });

  it('creates HttpResponse with Body', () => {
    const response = new HttpResponse({
      httpVersion: 1.1,
      status: 200,
      headers: { 'content-type': 'text/plain', date: 'Tue, 29 Oct 2024 16:56:32 GMT' },
      body: 'Hello World'
    });
    expect(response.toString()).toEqual(
      'HTTP/1.1 200\r\ncontent-type: text/plain\r\ndate: Tue, 29 Oct 2024 16:56:32 GMT\r\n\r\nHello World'
    );
  });

  it('creates HttpResponse with 1.2 version', () => {
    const response = new HttpResponse({ httpVersion: 1.2, status: 200 });
    expect(response.statusLine()).toEqual('HTTP/1.2 200');
  });

  it('creates HttpResponse with 404', () => {
    const response = new HttpResponse({ httpVersion: 1.1, status: 404 });
    expect(response.statusLine()).toEqual('HTTP/1.1 404');
  });

  it('creates HttpResponse with status phrase Created', () => {
    const response = new HttpResponse({ httpVersion: 1.1, status: 201, reasonPhrase: 'Created' });
    expect(response.statusLine()).toEqual('HTTP/1.1 201 Created');
  });
});
