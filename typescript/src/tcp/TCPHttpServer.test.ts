import { TCPHttpServer } from './TCPHttpServer';
import { createRequest } from './http-request-fixture';
import { HttpResponse } from './HttpResponse';

describe('TCPHttpServer', () => {
  it('handles GET request', () => {
    const request = createRequest({ method: 'GET' });

    const server = new TCPHttpServer({ port: 3000 });
    server.start();

    const response = server.handleRequest(request);
    expect(response).toEqual(HttpResponse.success().withJsonBody({ name: 'kody' }));
  });
});
