import { TCPHttpServer } from './TCPHttpServer';

export function startTCPServer() {
  const server = new TCPHttpServer();
  server.start();
}
