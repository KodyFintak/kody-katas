import { HttpResponse } from './HttpResponse';

describe('HttpResponse', () => {
  it('creates HttpResponse', () => {
    const response = new HttpResponse({
      httpVersion: 1.1,
      status: 200,
      headers: { 'content-type': 'text/plain', date: 'Tue, 29 Oct 2024 16:56:32 GMT' }
    });
    expect(response.toString()).toEqual('HTTP/1.1 200\r\ncontent-type: text/plain\r\ndate: Tue, 29 Oct 2024 16:56:32 GMT\r\n\r\n');
  });

  it('creates HttpResponse with Body', () => {
    const response = new HttpResponse({
      httpVersion: 1.1,
      status: 200,
      headers: { 'content-type': 'text/plain', date: 'Tue, 29 Oct 2024 16:56:32 GMT' },
      body: 'Hello World'
    });
    expect(response.toString()).toEqual(
      'HTTP/1.1 200\r\ncontent-type: text/plain\r\ndate: Tue, 29 Oct 2024 16:56:32 GMT\r\n\r\nHello World'
    );
  });

  it('create sets defaults', () => {
    const response = HttpResponse.create();
    expect(response).toEqual(new HttpResponse({ status: 200, httpVersion: 1.1, headers: { date: 'Tue, 29 Oct 2024 16:56:32 GMT' } }));
  });

  it('creates HttpResponse with chaining', () => {
    const response = HttpResponse.success().withHeader('date', 'Tue, 29 Oct 2024 16:56:32 GMT').withHeader('content-type', 'text/plain');
    expect(response.toString()).toEqual('HTTP/1.1 200\r\ndate: Tue, 29 Oct 2024 16:56:32 GMT\r\ncontent-type: text/plain\r\n\r\n');
  });

  it('creates HttpResponse with body with chaining', () => {
    const response = HttpResponse.success().withTextBody('Hello World');
    expect(response.toString()).toEqual(
      'HTTP/1.1 200\r\ndate: Tue, 29 Oct 2024 16:56:32 GMT\r\ncontent-type: text/plain\r\ncontent-length: 11\r\n\r\nHello World'
    );
  });

  it('creates HttpResponse with 1.2 version', () => {
    const response = new HttpResponse({ httpVersion: 1.2, status: 200, headers: {} });
    expect(response.statusLine()).toEqual('HTTP/1.2 200');
  });

  it('creates HttpResponse with 404', () => {
    const response = new HttpResponse({ httpVersion: 1.1, status: 404, headers: {} });
    expect(response.statusLine()).toEqual('HTTP/1.1 404');
  });

  it('creates HttpResponse with status phrase Created', () => {
    const response = new HttpResponse({ httpVersion: 1.1, status: 201, reasonPhrase: 'Created', headers: {} });
    expect(response.statusLine()).toEqual('HTTP/1.1 201 Created');
  });
});
