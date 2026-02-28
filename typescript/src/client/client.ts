import http, { IncomingMessage } from 'node:http';

export function sendHttpRequest(options: http.RequestOptions): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const request = http.request(options, response => {
      resolve(response);
    });
    request.end();
  });
}
