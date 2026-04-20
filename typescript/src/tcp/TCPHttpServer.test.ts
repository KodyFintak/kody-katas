import { createRequest } from './http-request-fixture';
import { HttpResponse } from './HttpResponse';
import { Socket } from 'node:net';
import { createTestServer } from './createTestServer';
import { HttpRequest } from './HttpRequest';

function onRequest(request: HttpRequest): HttpResponse {
  return HttpResponse.success().withTextBody(`Hello ${request.bodyAsObject().name}`);
}

describe('TCPHttpServer', () => {
  it('handles GET request', () => {
    const request = createRequest({ method: 'GET', rawBody: JSON.stringify({ name: 'Kody' }) });
    const server = createTestServer(onRequest);
    const response = server.handleRequest(request);
    expect(response).toEqual(HttpResponse.success().withTextBody('Hello Kody'));
  });

  describe('onData', () => {
    it('handles socket write', () => {
      const message =
        'GET / HTTP/1.1\r\nHost: localhost:3000\r\ncontent-type: application/json\r\ncontent-length: 18\r\n\r\n{ "name": "Kody" }';
      const socket = handleSocketData(message);
      expect(socket.isAlive).toEqual(false);
      expect(socket.writtenData).toEqual(HttpResponse.success().withTextBody('Hello Kody').toString());
    });

    it.skip('pauses on non finished message', () => {
      const bufferedMessage = 'GET / HTTP/1.1\r\nHost: localhost:3000\r\ncontent-type: application/json';
      const socket = handleSocketData(bufferedMessage);
      expect(socket.isAlive).toEqual(true);
      expect(socket.writtenData).toEqual('');
    });

    it.skip('handles incomplete message', () => {
      const bufferedMessage1 = 'GET / HTTP/1.1\r\nHost: localhost:3000\r\ncontent-type: application/json';
      const bufferedMessage2 = '\r\ncontent-length: 18\r\n\r\n{ "name": "Kody" }';
      const socket = handleSocketData(bufferedMessage1, bufferedMessage2);
      expect(socket.isAlive).toEqual(false);
      expect(socket.writtenData).toEqual(HttpResponse.success().withTextBody('Hello Kody').toString());
    });

    function handleSocketData(...messages: string[]) {
      const server = createTestServer(onRequest);
      const socket = new SpySocket();
      for (const message of messages) {
        server.onData(socket as unknown as Socket, message);
      }
      return socket;
    }
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
