import * as net from 'node:net';
import { HttpRequest } from './HttpRequest';

export function startTCPServer() {
  const server = net.createServer(socket => {
    socket.setEncoding('utf8');

    socket.on('data', data => {
      const requestAsString = Buffer.from(data).toString();
      const request = HttpRequest.parse(requestAsString);
      console.log(request);

      socket.write(`hello ${data}`);
    });

    socket.on('end', () => {
      console.log('client disconnected');
    });

    socket.on('error', console.error);
  });

  server.listen(3000);
}
