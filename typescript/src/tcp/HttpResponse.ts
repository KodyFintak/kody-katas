export class HttpResponse {
  constructor(
    private message: { httpVersion: number; status: number; reasonPhrase?: string; headers: Record<string, string>; body?: string }
  ) {}

  static create(now: () => Date = () => new Date()) {
    return new HttpResponse({ httpVersion: 1.1, status: 200, headers: {} }).withDate(now());
  }

  static success() {
    return HttpResponse.create().withStatus(200);
  }

  withStatus(status: number) {
    return new HttpResponse({ ...this.message, status });
  }

  withHeader(key: string, value: string) {
    return new HttpResponse({ ...this.message, headers: { ...this.message.headers, [key]: value } });
  }

  withTextBody(body: string) {
    return new HttpResponse({ ...this.message, body })
      .withHeader('content-type', 'text/plain')
      .withHeader('content-length', Buffer.byteLength(body).toString());
  }

  withJsonBody(body: any) {
    const bodyAsString = JSON.stringify(body);
    return new HttpResponse({ ...this.message, body: bodyAsString })
      .withHeader('content-type', 'application/json')
      .withHeader('content-length', Buffer.byteLength(bodyAsString).toString());
  }

  withDate(date: Date) {
    return this.withHeader('date', date.toUTCString());
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
