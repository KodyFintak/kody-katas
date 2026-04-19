import net, { Socket } from 'node:net';
import { HttpRequest } from './HttpRequest';
import { handleRequest } from './handle-request';
import { HttpResponse } from './HttpResponse';

export class TCPHttpServer {
  private readonly port: number;
  private readonly onRequest: (request: HttpRequest) => HttpResponse;

  constructor(options: { port?: number; onRequest?: (request: HttpRequest) => HttpResponse } = {}) {
    this.port = options.port ?? 3000;
    this.onRequest = options.onRequest ?? handleRequest;
  }

  start() {
    const server = net.createServer(socket => {
      socket.setEncoding('utf8');
      socket.on('data', data => this.onData(socket, data));
      socket.on('end', () => console.log('client disconnected'));
      socket.on('error', console.error);
    });

    server.listen(this.port);
    console.log(`started server on port ${this.port}`);
  }

  handleRequest(request: HttpRequest) {
    return this.onRequest(request);
  }

  onData(socket: Socket, data: string | Buffer<ArrayBuffer>) {
    const requestAsString = Buffer.from(data).toString();
    const request = HttpRequest.parse(requestAsString);
    console.log(request);
    const response = this.onRequest(request);
    socket.write(response.toString());
    socket.end();
  }
}
