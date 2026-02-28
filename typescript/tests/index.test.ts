import { startServer } from '../src/index';

describe('test', () => {
  it('starts a http server', () => {
    const server = startServer();

    expect(server).toEqual(2);
  });
});
