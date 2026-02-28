import { sendHttpRequest } from './client';

export class HttpClient {
  constructor(private http: Http = new NodeHttp()) {}

  async sendRequest(request: HttpRequest) {
    const response = await this.http.send(request);
    return { status: response.statusCode };
  }
}

export interface HttpRequest {
  hostname: string;
  port: number;
  path: string;
  method: string;
}

interface Http {
  send(request: HttpRequest): Promise<{ statusCode?: number }>;
}

class NodeHttp implements Http {
  async send(request: HttpRequest): Promise<{ statusCode?: number }> {
    return await sendHttpRequest(request);
  }
}

export class StubNodeHttp implements Http {
  constructor(private options: { status: number; request: HttpRequest }) {}
  async send(request: HttpRequest): Promise<{ statusCode?: number }> {
    if (request !== this.options.request) throw new Error('No configured response');
    return { statusCode: this.options.status };
  }
}
