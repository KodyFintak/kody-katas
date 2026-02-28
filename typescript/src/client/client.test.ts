import { HttpClient, HttpRequest, StubNodeHttp } from './httpClient';

describe('client test', () => {
  it('sends a http request', async () => {
    const request: HttpRequest = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    };
    const stubNodeHttp = new StubNodeHttp({ status: 200, request });
    const client = new HttpClient(stubNodeHttp);
    const response = await client.sendRequest(request);
    expect(response).toEqual({ status: 200 });
  });
});
