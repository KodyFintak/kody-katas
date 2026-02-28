import { sendHttpRequest } from './client';

export class HttpClient {
  constructor(private http: Http = new NodeHttp()) {}

  async sendRequest() {
    const response = await this.http.send();
    return { status: response.statusCode };
  }
}

interface Http {
  send(): Promise<{ statusCode?: number }>;
}

class NodeHttp implements Http {
  async send() {
    return await sendHttpRequest({});
  }
}

export class StubNodeHttp implements Http {
  constructor(private options: { status: number }) {}
  async send() {
    return { statusCode: this.options.status };
  }
}