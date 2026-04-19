import { Logger, TCPHttpServer } from './TCPHttpServer';
import { createRequest } from './http-request-fixture';
import { HttpResponse } from './HttpResponse';
import { handleRequest } from './handle-request';
import { Socket } from 'node:net';

const noopLogger: Logger = {
  log: (message: any): void => {},
  error: (message: any): void => {}
};

describe('TCPHttpServer', () => {
  it('handles GET request', () => {
    const request = createRequest({ method: 'GET' });
    const server = new TCPHttpServer({ onRequest: handleRequest, logger: noopLogger });
    const response = server.handleRequest(request);
    expect(response).toEqual(HttpResponse.success().withJsonBody({ name: 'kody' }));
  });

  it('handles socket write', () => {
    const messageAsString = 'POST / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive\r\n\r\n';
    const server = new TCPHttpServer({ onRequest: handleRequest, logger: noopLogger });
    const socket = new SpySocket();
    server.onData(socket as unknown as Socket, messageAsString);
    expect(socket.isAlive).toEqual(false);
    expect(socket.writtenData).toEqual(HttpResponse.success().withTextBody('Hello ').toString());
  });
});

class SpySocket {
  public writtenData: string = '';
  public isAlive: boolean = true;

  write(str: Uint8Array | string, encoding?: BufferEncoding, cb?: (err?: Error | null) => void) {
    this.writtenData = str as string;
  }

  end(str: Uint8Array | string, encoding?: BufferEncoding, callback?: () => void) {
    this.isAlive = false;
  }
}
