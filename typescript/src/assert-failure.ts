import {fail} from "./kdd";

export function assertFailure(func: () => void) {
    try {
        func()
    } catch (e) {
        return
    }

    fail("expected failure, but did not get one")
}