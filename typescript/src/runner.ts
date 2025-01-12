import {Test} from "./test";

export class Runner {
    constructor(readonly tests: Test[] = []) {
    }

    addTest(test: Test) {
        this.tests.push(test)
    }

    runTests() {
        this.tests.forEach(test => this.runTest(test))
    }

    runTest(test: Test) {
        try {
            test.run()
        } catch (e) {
            if (e instanceof Error) {
                console.log(`- ${test.name}`)
                console.error(`\tFAIL ${e.stack}`)
            }
        }
    }

    get testNames() {
        return this.tests.map(test => test.name)
    }
}

export const runner = new Runner()