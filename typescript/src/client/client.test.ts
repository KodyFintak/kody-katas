import { sendHttpRequest } from './client';

class HttpClient {
  constructor(private stubNodeHttp: StubNodeHttp) {}

  async sendRequest() {
    const response = await this.stubNodeHttp.send();
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

class StubNodeHttp implements Http {
  constructor(private options: { status: number }) {}
  async send() {
    return { statusCode: this.options.status };
  }
}

describe('client test', () => {
  it('sends a http request', async () => {
    const stubNodeHttp = new StubNodeHttp({ status: 200 });
    const client = new HttpClient(stubNodeHttp);
    const response = await client.sendRequest();
    expect(response).toEqual({ status: 200 });
  });
});
