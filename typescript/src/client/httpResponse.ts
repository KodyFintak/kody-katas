import { IncomingHttpHeaders } from 'node:http';

export interface HttpResponse {
  status: number;
  headers: IncomingHttpHeaders;
  content: string;
}
