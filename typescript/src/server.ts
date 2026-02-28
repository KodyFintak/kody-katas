import * as http from 'node:http';

export function startServer() {
  const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    response.statusCode = 200;
    response.setHeader('content-type', 'text/plain');
    response.end('Hello World!');
  });

  server.listen(3000, 'localhost', () => {
    console.log('Server running on http://localhost:3000');
  });
}
