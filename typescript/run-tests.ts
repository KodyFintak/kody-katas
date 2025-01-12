const childProcess = require("child_process");

function execute(command: string) {
    childProcess.execSync(command);
}

function runTests() {
    execute("npx ts-node tests/index.test.ts")
}

runTests()