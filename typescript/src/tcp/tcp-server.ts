import * as net from 'node:net';

export function startTCPServer() {
  const server = net.createServer(socket => {
    socket.setEncoding('utf8');

    socket.on('data', data => {
      console.log(data);

      socket.write(`hello ${data}`);
    });

    socket.on('end', () => {
      console.log('client disconnected');
    });

    socket.on('error', console.error);
  });

  server.listen(3000);
}
