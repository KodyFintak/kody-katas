import { HttpClient } from './httpClient';
import { HttpRequest } from './httpRequest';
import { HttpResponse } from './httpResponse';

function logResponse(value: HttpResponse) {
  console.log(JSON.stringify(value, null, 2));
}

describe('spike client test', () => {
  it('sends a GET http request', async () => {
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

  it('sends a POST http request', async () => {
    const request: HttpRequest = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'POST',
      body: 'Kody'
    };
    const client = new HttpClient();
    const response = await client.sendRequest(request);
    console.log(JSON.stringify(response, null, 2));
    expect(response.status).toEqual(200);
    expect(response.headers['content-length']).toEqual('10');
    expect(response.content).toEqual('Hello Kody');
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
    expect(response.headers.allowed).toEqual('OPTIONS, GET, HEAD, TRACE');
  });

  it('TRACE', async () => {
    const request: HttpRequest = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'TRACE'
    };
    const client = new HttpClient();
    const response = await client.sendRequest(request);

    logResponse(response);

    expect(response.status).toEqual(200);
    expect(response.headers['content-type']).toEqual('message/http');
    expect(response.content).toEqual('TRACE / HTTP/1.1\r\nhost: localhost:3000\r\nconnection: keep-alive');
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
