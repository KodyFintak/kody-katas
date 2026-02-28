class HttpClient {
  async sendRequest() {
    return { status: 200 };
  }
}

describe('client test', () => {
  it('sends a http request', async () => {
    const client = new HttpClient();
    const response = await client.sendRequest();
    expect(response).toEqual({ status: 200 });
  });
});
