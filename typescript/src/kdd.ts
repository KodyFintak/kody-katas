export function it(name: string, test: () => void) {
    console.log(`-\t${name}`)
    try {
        test();
        console.log("\t\tpass")
    } catch (e: any) {
        console.error(`\t\tfail\t${e.message}`)
    }
}

export function fail(message: string) {
    throw new Error(message);
}

export function expect<T>(actual: T) {
    return {
        toEqual(expected: T) {
            const testResult = isEqual(actual, expected);
            if (!testResult) fail(`expected ${actual} == ${expected}`)
        }
    }
}

function isEqual<T>(actual: T, expected: T) {
    if (typeof actual == "object") return JSON.stringify(actual) === JSON.stringify(expected);
    return actual === expected;
}