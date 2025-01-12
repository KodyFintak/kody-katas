import {runner} from "./src/runner";
import {allFilesIn} from "./src/read-directory";

function runTests(directory: string) {
    const allFilesInDirectory = allFilesIn(directory)
    const allTestFiles = allFilesInDirectory.filter(file => file.endsWith(".test.ts"))
    allTestFiles.forEach(file => require(`./${file}`))
    runner.runTests()
}

runTests(`${process.argv[2]}`)