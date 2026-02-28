import http, { IncomingHttpHeaders, IncomingMessage } from 'node:http';

import { HttpResponse } from './httpResponse';
import { HttpRequest } from './httpRequest';

export interface NodeHttpResponse {
  status: number;
  headers: IncomingHttpHeaders;
  content: string;
}

export function sendHttpRequest(request: HttpRequest): Promise<NodeHttpResponse> {
  return new Promise((resolve, reject) => {
    const clientRequest = http.request(request, (response: IncomingMessage) => {
      response.setEncoding('utf8');

      let content = '';

      response.on('data', chunk => {
        content += chunk;
      });

      response.on('end', () => {
        resolve(createHttpResponse(response, content));
      });
    });

    if (request.body) clientRequest.write(request.body);

    clientRequest.end();
  });
}

function createHttpResponse(response: IncomingMessage, content: string): HttpResponse {
  return {
    status: response.statusCode ?? 0,
    headers: response.headers,
    content
  };
}
