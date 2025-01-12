import {runner} from "./src/runner";

function runTests() {
    require(`./${process.argv[2]}`)
    runner.runTests()
}

runTests()