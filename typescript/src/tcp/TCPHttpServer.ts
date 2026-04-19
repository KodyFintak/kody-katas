import net, { Socket } from 'node:net';
import { HttpRequest } from './HttpRequest';
import { handleRequest } from './handle-request';
import { HttpResponse } from './HttpResponse';
import { Logger } from './Logger';

export class TCPHttpServer {
  private readonly port: number;
  private readonly onRequest: (request: HttpRequest) => HttpResponse;
  private readonly logger: Logger;

  constructor(options: { port?: number; onRequest?: (request: HttpRequest) => HttpResponse; logger?: Logger } = {}) {
    this.port = options.port ?? 3000;
    this.onRequest = options.onRequest ?? handleRequest;
    this.logger = options.logger ?? console;
  }

  start() {
    const server = net.createServer(socket => {
      socket.setEncoding('utf8');
      socket.on('data', data => this.onData(socket, data));
      socket.on('end', () => this.logger.log('client disconnected'));
      socket.on('error', this.logger.error);
    });

    server.listen(this.port);
    this.logger.log(`started server on port ${this.port}`);
  }

  handleRequest(request: HttpRequest) {
    return this.onRequest(request);
  }

  onData(socket: Socket, data: string | Buffer<ArrayBuffer>) {
    const requestAsString = Buffer.from(data).toString();
    const request = HttpRequest.parse(requestAsString);
    this.logger.log(request);
    const response = this.onRequest(request);
    socket.write(response.toString());
    socket.end();
  }
}
