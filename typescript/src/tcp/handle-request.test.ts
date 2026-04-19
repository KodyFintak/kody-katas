import { handleRequest } from './handle-request';
import { HttpRequest } from './HttpRequest';
import { HttpResponse } from './HttpResponse';

describe('handleRequest', () => {
  it('handles GET', () => {
    const response = handleRequest(
      new HttpRequest({
        headers: {},
        httpVersion: '',
        messageAsString: '',
        method: 'GET',
        rawBody: '',
        uri: ''
      })
    );
    expect(response).toEqual(HttpResponse.success().withJsonBody({ name: 'kody' }));
  });
});
