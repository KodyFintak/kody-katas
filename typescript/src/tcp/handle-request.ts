import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

export function handleRequest(request: HttpRequest): HttpResponse {
  if (request.uri === '/hello') return handleHelloWorldRoute(request);

  if (request.method === 'POST') {
    return HttpResponse.success().withTextBody(`Hello ${request.body}`);
  }
  return HttpResponse.success().withJsonBody({ name: 'kody' });
}

function handleHelloWorldRoute(request: HttpRequest): HttpResponse {
  return HttpResponse.success().withHtmlBody(`<p>Hello World</p>`);
}
