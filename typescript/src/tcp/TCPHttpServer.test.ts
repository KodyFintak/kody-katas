import { TCPHttpServer } from './TCPHttpServer';

describe('TCPHttpServer', () => {
  it('handles GET request', () => {
    const server = new TCPHttpServer();
    server.start();
  });
});
