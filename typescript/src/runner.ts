export class Runner {
    constructor(readonly tests: string[] = []) {
    }
    addTest(name: string) {
        this.tests.push(name)
    }
}

export const runner = new Runner()