import http, { IncomingHttpHeaders, IncomingMessage } from 'node:http';

import { HttpResponse } from './httpResponse';

export interface NodeHttpResponse {
  status: number;
  headers: IncomingHttpHeaders;
  content: string;
}

export function sendHttpRequest(options: http.RequestOptions): Promise<NodeHttpResponse> {
  return new Promise((resolve, reject) => {
    const request = http.request(options, (response: IncomingMessage) => {
      response.setEncoding('utf8');

      let content = '';

      response.on('data', chunk => {
        content += chunk;
      });

      response.on('end', () => {
        resolve(createHttpResponse(response, content));
      });
    });

    request.end();
  });
}

function createHttpResponse(response: IncomingMessage, content: string): HttpResponse {
  return {
    status: response.statusCode ?? 0,
    headers: response.headers,
    content
  };
}
