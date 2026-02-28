import * as http from 'node:http';

export interface ServerOptions {
  port?: number;
  hostname?: string;
}

export function startServer({ port = 3000, hostname = 'localhost' }: ServerOptions = {}) {
  const server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    console.log(JSON.stringify({ method: request.method, headers: request.headers }));

    if (request.method === 'OPTIONS') {
      response.setHeader('allowed', 'OPTIONS, GET, HEAD');
      response.end();
      return;
    }

    if (request.method === 'GET') {
      response.statusCode = 204;
      response.setHeader('content-type', 'text/plain');
      response.end('Hello World!');
      return;
    }

    if (request.method === 'HEAD') {
      response.statusCode = 204;
      response.end();
      return;
    }

    response.statusCode = 405;
    response.setHeader('content-type', 'text/plain');
    response.end(`Method: ${request.method} not allowed`);
  });

  server.listen(port, hostname, () => {
    console.log(`Server running on http://${hostname}:${port}`);
  });
}
