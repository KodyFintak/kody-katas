import {expect, given, it} from "../src/kdd";
import {runner} from "../src/runner";
import {Test} from "../src/test";

given('the test runner', () => {
    it('has this test in it', () => {
        expect(runner.testNames).toContain("has this test in it")
    });
    it('runs the test', () => {
        runner.runTest(new Test("my test", () => expect(true).toEqual(false)))
    });
})