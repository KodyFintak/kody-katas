import { HttpClient } from './httpClient';

const httpclient = new HttpClient();

httpclient
  .sendRequest({
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET'
  })
  .then(response => {
    console.log(response.status);
    process.exit();
  });
