export class Test {
    constructor(public readonly name: string, private test: Function) {
    }

    run() {
        this.test()
    }
}