import net, { Socket } from 'node:net';
import { HttpRequest } from './HttpRequest';
import { handleRequest } from './handle-request';

export class TCPHttpServer {
  start() {
    const server = net.createServer(socket => {
      socket.setEncoding('utf8');

      socket.on('data', data => this.onData(socket, data));

      socket.on('end', () => {
        console.log('client disconnected');
      });

      socket.on('error', console.error);
    });

    const port = 3000;
    server.listen(port);
    console.log(`started server on port ${port}`);
  }

  private onData(socket: Socket, data: string) {
    const requestAsString = Buffer.from(data).toString();
    const request = HttpRequest.parse(requestAsString);
    console.log(request);
    const response = handleRequest(request);
    socket.write(response.toString());
    socket.end();
  }
}
