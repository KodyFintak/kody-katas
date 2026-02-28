import { HttpClient } from './httpClient';
import { HttpRequest } from './httpRequest';

describe('spike client test', () => {
  it('sends a http request', async () => {
    const request: HttpRequest = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET'
    };
    const client = new HttpClient();
    const response = await client.sendRequest(request);
    console.log(JSON.stringify(response, null, 2));
  });
});
