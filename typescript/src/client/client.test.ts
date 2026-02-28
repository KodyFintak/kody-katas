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

  describe('Nullable', () => {
    it('throws error when no request configured', async () => {
      const request: HttpRequest = {
        hostname: 'localhost',
        port: 3000,
        path: '/',
        method: 'GET'
      };
      const client = HttpClient.createNull();
      await expect(() => client.sendRequest(request)).rejects.toEqual(new Error('No configured response'));
    });
  });
});
