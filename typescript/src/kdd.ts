import {AssertionError} from "./assertion-error";

export function given(name: string, test: () => void) {
    console.log(`given: ${name}`)
    test()
}

export function it(name: string, test: () => void) {
    console.log(`- ${name}`)
    try {
        test();
        console.log("\tPASS")
    } catch (e) {
        if (e instanceof Error) {
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
        toContain(...expectedElements: T[]) {
            expectedElements.forEach(expected => {
                const testResult = String(actual).includes(String(expected));
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
    return JSON.stringify(actual) === JSON.stringify(expected);
}