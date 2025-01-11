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

export function expect<T>(value: T) {
    return {
        toEqual(expected: T) {
            const testResult = value === expected;
            if (!testResult) fail(`expected ${value} == ${expected}`)
        }
    }
}