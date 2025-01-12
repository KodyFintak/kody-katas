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
        expect(e.stack).toContain("AssertionError: Nope", "at", "tests/assertion-error.test.ts")
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
        expect(e.stack).toContain("AssertionError: Nope", "at Object.math ", "tests/assertion-error.test.ts")
    }
});

