import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function handleRequest(request: HttpRequest): HttpResponse {
  if (request.uri === '/hello') return handleHelloWorldRoute(request);

  if (request.method === 'POST') {
    return HttpResponse.success().withTextBody(`Hello ${request.body}`);
  }
  return HttpResponse.success().withJsonBody({ name: 'kody' });
}

function handleHelloWorldRoute(request: HttpRequest): HttpResponse {
  const html = readFileSync(resolve(__dirname, 'routes/hello-world.html'), 'utf-8');
  return HttpResponse.success().withHtmlBody(html);
}
