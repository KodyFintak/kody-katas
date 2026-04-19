import { TCPHttpServer } from './TCPHttpServer';
import { createRequest } from './http-request-fixture';
import { HttpResponse } from './HttpResponse';
import { handleRequest } from './handle-request';

describe('TCPHttpServer', () => {
  it('handles GET request', () => {
    const request = createRequest({ method: 'GET' });
    const server = new TCPHttpServer({ onRequest: handleRequest });
    const response = server.handleRequest(request);
    expect(response).toEqual(HttpResponse.success().withJsonBody({ name: 'kody' }));
  });
});
