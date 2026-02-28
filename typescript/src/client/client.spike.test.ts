import { HttpClient } from './httpClient';
import { HttpRequest } from './httpRequest';

function logResponse(value: HttpResponse) {
  console.log(JSON.stringify(value, null, 2));
}

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

  it('gets headers via HEAD', async () => {
    const request: HttpRequest = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'HEAD'
    };
    const client = new HttpClient();
    const response = await client.sendRequest(request);
    expect(response.status).toEqual(200);
    expect(response.headers['content-length']).toEqual('12');
  });

  it('get list of options via OPTIONS', async () => {
    const request: HttpRequest = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'OPTIONS'
    };
    const client = new HttpClient();
    const response = await client.sendRequest(request);

    logResponse(response);

    expect(response.status).toEqual(200);
    expect(response.headers.allowed).toEqual('OPTIONS, GET, HEAD');
  });

  it('fails on not accepted method', async () => {
    const request: HttpRequest = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'PATCH'
    };
    const client = new HttpClient();
    const response = await client.sendRequest(request);
    logResponse(response);
  });
});
