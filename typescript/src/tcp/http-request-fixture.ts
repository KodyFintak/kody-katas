import { HttpRequest, HttpRequestMessage } from './HttpRequest';

const defaultMessage: HttpRequestMessage = {
  headers: {},
  httpVersion: '',
  messageAsString: '',
  method: 'GET',
  rawBody: '',
  uri: ''
};

export function createRequest(message: Partial<HttpRequestMessage> = {}) {
  return new HttpRequest({ ...defaultMessage, ...message });
}
