import { sendHttpRequest } from './client';

sendHttpRequest({
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
}).then(response => {
  console.log(response.statusCode);
  process.exit();
});
