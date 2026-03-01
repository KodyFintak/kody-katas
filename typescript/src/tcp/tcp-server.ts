import * as net from 'node:net';
import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

export function startTCPServer() {
  const server = net.createServer(socket => {
    socket.setEncoding('utf8');

    socket.on('data', data => {
      const requestAsString = Buffer.from(data).toString();
      const request = HttpRequest.parse(requestAsString);
      console.log(request);

      const response = HttpResponse.success().withJsonBody({ name: 'kody' });
      console.log(response.toString());
      socket.write(response.toString());
      socket.end();
    });

    socket.on('end', () => {
      console.log('client disconnected');
    });

    socket.on('error', console.error);
  });

  server.listen(3000);
}
