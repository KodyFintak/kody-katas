import {expect, it} from "../src/kdd";
import {AssertionError} from "../src/assertion-error";


it('stack trace only contains caller', () => {
    const obj = {
        math(a: number, b: number) {
            throw new AssertionError("Nope", this.math)
        }
    }

    try {
        obj.math(1, 2)
    } catch (e) {
        expect(e.stack).toEqual("AssertionError: Nope\n" +
            "    at /Users/kodyfintak/Documents/software/kody-katas/typescript/tests/assertion-error.test.ts:13:13")
    }
});