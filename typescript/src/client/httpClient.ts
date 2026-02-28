import { sendHttpRequest } from './client';
import { HttpRequest } from './httpRequest';
import { HttpResponse } from './httpResponse';

export class HttpClient {
  constructor(private http: Http = new NodeHttp()) {}

  async sendRequest(request: HttpRequest) {
    return await this.http.send(request);
  }

  static createNull() {
    return new HttpClient(new StubNodeHttp());
  }
}

interface Http {
  send(request: HttpRequest): Promise<HttpResponse>;
}

class NodeHttp implements Http {
  async send(request: HttpRequest): Promise<HttpResponse> {
    return await sendHttpRequest(request);
  }
}

export class StubNodeHttp implements Http {
  constructor(private options: { status?: number; request?: HttpRequest } = {}) {}

  async send(request: HttpRequest): Promise<HttpResponse> {
    if (request !== this.options.request) throw new Error('No configured response');
    return { status: this.options.status ?? 0, headers: {}, content: '' };
  }
}
