import { handleRequest } from './handle-request';
import { HttpRequest, HttpRequestMessage } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

describe('handleRequest', () => {
  it('handles GET', () => {
    const request = createRequest({ method: 'GET' });
    const response = handleRequest(request);
    expect(response).toEqual(HttpResponse.success().withJsonBody({ name: 'kody' }));
  });

  it('handles POST', () => {
    const request = createRequest({ method: 'POST', rawBody: 'Kody' });
    const response = handleRequest(request);
    expect(response).toEqual(HttpResponse.success().withTextBody('Hello Kody'));
  });
});

const defaultMessage = {
  headers: {},
  httpVersion: '',
  messageAsString: '',
  method: 'GET',
  rawBody: '',
  uri: ''
};

function createRequest(message: Partial<HttpRequestMessage> = {}) {
  return new HttpRequest({ ...defaultMessage, ...message });
}
