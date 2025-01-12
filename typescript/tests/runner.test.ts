import {expect, given, it} from "../src/kdd";
import {runner} from "../src/runner";

given('the test runner', () => {
    it('has this test in it', () => {
        expect(runner.tests).toContain("has this test in it")
    });
})