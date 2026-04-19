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
});
