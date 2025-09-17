import {hello} from '../src';
import {expect} from "vitest";

describe('test', () => {
    it('should do something', () => {
        expect(hello()).toEqual(false)
    });
});
