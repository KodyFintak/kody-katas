class HttpClient {
  constructor(private stubNodeHttp: StubNodeHttp) {}

  async sendRequest() {
    return this.stubNodeHttp.send();
  }
}

class StubNodeHttp {
  constructor(private options: { status: number }) {}
  async send() {
    return this.options;
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
