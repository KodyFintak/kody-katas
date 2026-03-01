import { HttpRequest } from './HttpRequest';

describe('HttpRequest', () => {
  it('parses GET HTTP message', () => {
    const messageAsString = 'GET / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive\r\n\r\n';
    const httpRequest = HttpRequest.parse(messageAsString);
    expect(httpRequest.method).toEqual('GET');
    expect(httpRequest.uri).toEqual('/');
    expect(httpRequest.version).toEqual('1.1');
    expect(httpRequest.headers).toEqual({ host: 'localhost:3000', connection: 'keep-alive' });
    expect(httpRequest.toString()).toEqual(messageAsString);
  });

  it('parses POST HTTP message', () => {
    const messageAsString = 'POST / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive\r\n\r\n';
    const httpRequest = HttpRequest.parse(messageAsString);
    expect(httpRequest.method).toEqual('POST');
  });

  it('parses HTTP 1.2 message', () => {
    const messageAsString = 'POST / HTTP/1.2\r\nHost: localhost:3000\r\nConnection: keep-alive\r\n\r\n';
    const httpRequest = HttpRequest.parse(messageAsString);
    expect(httpRequest.version).toEqual('1.2');
  });

  it('parses /cat/hello message', () => {
    const messageAsString = 'GET /cat/hello HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive\r\n\r\n';
    const httpRequest = HttpRequest.parse(messageAsString);
    expect(httpRequest.uri).toEqual('/cat/hello');
  });

  it('throws Error when request line is invalid', () => {
    const messageAsString = 'POST/HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive\r\n\r\n';
    expect(() => HttpRequest.parse(messageAsString)).toThrow();
  });

  it('throws Error when no blank line between headers and data', () => {
    const messageAsString = 'GET / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive';
    expect(() => HttpRequest.parse(messageAsString)).toThrow();
  });

  it('parses request with body', () => {
    const messageAsString = 'POST / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive\r\n\r\nHello';
    const httpRequest = HttpRequest.parse(messageAsString);
    expect(httpRequest.body).toEqual('Hello');
    expect(httpRequest.headers).toEqual({ host: 'localhost:3000', connection: 'keep-alive' });
  });

  it('parses request with cat body', () => {
    const messageAsString = 'POST / HTTP/1.1\r\nHost: localhost:3000\r\nConnection: keep-alive\r\n\r\nCat';
    const httpRequest = HttpRequest.parse(messageAsString);
    expect(httpRequest.body).toEqual('Cat');
  });
});
