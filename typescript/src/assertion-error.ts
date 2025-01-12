export class AssertionError extends Error {
    name = "AssertionError";

    constructor(message: string, assertionFunction?: Function) {
        super(message);
        this.startStackTraceAt(assertionFunction);
    }

    private startStackTraceAt(assertionFunction?: Function) {
        if (Error.captureStackTrace && assertionFunction) {
            Error.captureStackTrace(this, assertionFunction);
            const indexOfLineInsideFramework = this.stack?.split("\n").findIndex(line => line.includes("kdd.ts"))
            this.stack = this.stack?.split("\n").slice(0, indexOfLineInsideFramework).join("\n")
        }
    }
}