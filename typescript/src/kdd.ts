import {AssertionError} from "./assertion-error";
import {runner} from "./runner";

export function given(name: string, test: () => void) {
    console.log(`given: ${name}`)
    test()
}

export function it(name: string, test: () => void) {
    // console.log(`- ${name}`)
    runner.addTest(name)
    try {
        test();
        // console.log("\tPASS")
    } catch (e) {
        if (e instanceof Error) {
            console.log(`- ${name}`)
            console.error(`\tFAIL ${e.stack}`)
        }
    }
}

export function fail(message: string, assertionFunction?: Function) {
    throw new AssertionError(message, assertionFunction);
}

export function expect<T>(actual: T) {
    return {
        toEqual(expected: T) {
            const testResult = isEqual(actual, expected);
            if (!testResult) fail(`expected ${JSON.stringify(actual)} === ${JSON.stringify(expected)}`, this.toEqual);
        },
        toContain(...expectedElements: any[]) {
            expectedElements.forEach(expected => {
                const testResult = containsElement(actual, expected);
                if (!testResult) fail(`expected ${JSON.stringify(actual)} to contain ${JSON.stringify(expected)}`, this.toContain);
            })
        }
    };
}

function isEqual<T>(actual: T, expected: T) {
    if (typeof actual == "object") return objectsAreEqual(actual, expected);
    return actual === expected;
}

function objectsAreEqual<T>(actual: T, expected: T) {
    return stringifyObjectInKeyOrder(actual) === stringifyObjectInKeyOrder(expected)
}

function stringifyObjectInKeyOrder<T>(o: T) {
    return JSON.stringify(o, Object.keys(o).sort());
}

function containsElement<T>(actual: T, expected: any) {
    if (Array.isArray(actual)) return actual.some(element => isEqual(element, expected))
    return String(actual).includes(String(expected));
}