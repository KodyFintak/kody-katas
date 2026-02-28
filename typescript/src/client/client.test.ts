import { HttpClient, StubNodeHttp } from './httpClient';

describe('client test', () => {
  it('sends a http request', async () => {
    const stubNodeHttp = new StubNodeHttp({ status: 200 });
    const client = new HttpClient(stubNodeHttp);
    const response = await client.sendRequest();
    expect(response).toEqual({ status: 200 });
  });
});
