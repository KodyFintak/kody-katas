import * as http from 'node:http';

const request = http.request(
  {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
  },
  response => {
    console.log(response.statusCode);
  }
);

request.end();
