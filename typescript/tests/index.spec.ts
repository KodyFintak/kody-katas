import { expect } from 'chai';
import 'mocha';

import { add } from '../src/index';

describe('test', () => {
    it('should add 1 + 2', () => {
        expect(add(1, 2)).to.eq(3);
    });
});
