import http from 'node:http';

export interface HttpRequest {
  hostname: string;
  port: number;
  path: string;
  method: string;
  headers?: http.OutgoingHttpHeaders;
  body?: any;
}
