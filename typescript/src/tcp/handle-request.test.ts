import { handleRequest } from './handle-request';
import { HttpResponse } from './HttpResponse';
import { createRequest } from './http-request-fixture';

describe('handleRequest', () => {
  it('handles GET', () => {
    const request = createRequest({ method: 'GET' });
    const response = handleRequest(request);
    expect(response).toEqual(HttpResponse.success().withJsonBody({ name: 'kody' }));
  });

  it('handles POST', () => {
    const request = createRequest({ method: 'POST', rawBody: 'Kody' });
    const response = handleRequest(request);
    expect(response).toEqual(HttpResponse.success().withTextBody('Hello Kody'));
  });

  it('/hello responds with hello world html', () => {
    const request = createRequest({ method: 'GET', uri: '/hello' });
    const response = handleRequest(request);
    expect(response.status()).toEqual(200);
    expect(response.body()).toContain('<p>Hello World</p>');
  });
});
