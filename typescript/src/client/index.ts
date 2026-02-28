import * as http from 'node:http';
import { IncomingMessage } from 'node:http';

function sendHttpRequest(options: any): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const request = http.request(options, response => {
      resolve(response);
    });
    request.end();
  });
}

sendHttpRequest({
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
}).then(response => console.log(response.statusCode));
