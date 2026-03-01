export class HttpResponse {
  constructor(
    private message: { httpVersion: number; status: number; reasonPhrase?: string; headers: Record<string, string>; body?: string }
  ) {}

  static create() {
    return new HttpResponse({ httpVersion: 1.1, status: 200, headers: { date: 'Tue, 29 Oct 2024 16:56:32 GMT' } });
  }

  static success() {
    return new HttpResponse({ httpVersion: 1.1, status: 200, headers: {} });
  }

  withHeader(key: string, value: string) {
    return new HttpResponse({ ...this.message, headers: { ...this.message.headers, [key]: value } });
  }

  withTextBody(body: string) {
    return new HttpResponse({ ...this.message, body })
      .withHeader('content-type', 'text/plain')
      .withHeader('content-length', Buffer.byteLength(body).toString());
  }

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
