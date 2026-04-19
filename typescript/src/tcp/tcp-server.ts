import * as net from 'node:net';
import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

function handleRequest(request: HttpRequest) {
  if (request.method === 'POST') {
    return HttpResponse.success().withTextBody(`Hello ${request.body}`);
  }
  return HttpResponse.success().withJsonBody({ name: 'kody' });
}

export function startTCPServer() {
  const server = net.createServer(socket => {
    socket.setEncoding('utf8');

    socket.on('data', data => {
      const requestAsString = Buffer.from(data).toString();
      const request = HttpRequest.parse(requestAsString);
      console.log(request);
      const response = handleRequest(request);
      socket.write(response.toString());
      socket.end();
    });

    socket.on('end', () => {
      console.log('client disconnected');
    });

    socket.on('error', console.error);
  });

  const port = 3000;
  server.listen(port);
  console.log(`started server on port ${port}`);
}
