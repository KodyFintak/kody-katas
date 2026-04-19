import { TCPHttpServer } from './TCPHttpServer';

describe('TCPHttpServer', () => {
  it('handles GET request', () => {
    const server = new TCPHttpServer({ port: 3000 });
    server.start();
  });
});
