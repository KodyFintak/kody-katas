import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

export function handleRequest(request: HttpRequest): HttpResponse {
  if (request.method === 'POST') {
    return HttpResponse.success().withTextBody(`Hello ${request.body}`);
  }
  return HttpResponse.success().withJsonBody({ name: 'kody' });
}
