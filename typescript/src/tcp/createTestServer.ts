import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';
import { TCPHttpServer } from './TCPHttpServer';
import { noopLogger } from './Logger';

export function createTestServer(onRequest: (request: HttpRequest) => HttpResponse) {
  return new TCPHttpServer({ onRequest, logger: noopLogger });
}
