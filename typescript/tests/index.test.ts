import { add } from '../src';

describe('adds numbers', () => {
  it('adds 1 and 1', () => {
    expect(add(1, 1)).toEqual(2);
  });
});