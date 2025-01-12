import {expect, it} from "../src/kdd";
import {AssertionError} from "../src/assertion-error";


it('stack trace only contains caller one level deep', () => {
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

it('stack trace only contains caller two levels deep', () => {
    function mathCaller(a: number, b: number) {
        throw new AssertionError("Nope", mathCaller)
    }

    const obj = {
        math(a: number, b: number) {
            mathCaller(a, b)
        }
    }

    try {
        obj.math(1, 2)
    } catch (e) {
        expect(e.stack).toEqual("AssertionError: Nope\n    at Object.math (/Users/kodyfintak/Documents/software/kody-katas/typescript/tests/assertion-error.test.ts:27:13)\n    at /Users/kodyfintak/Documents/software/kody-katas/typescript/tests/assertion-error.test.ts:32:13")
    }
});
