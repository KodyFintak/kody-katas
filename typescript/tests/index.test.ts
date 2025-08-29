import { add } from '../src';

describe('test', () => {
    it('should add 1 + 2', () => {
        expect(add(1, 2)).toEqual(2);
    });
});
