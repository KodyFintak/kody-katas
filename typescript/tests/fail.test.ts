import {fail, it} from "../src/kdd";
import {assertFailure} from "../src/assert-failure";

it('fails', () => {
    assertFailure(() => fail("expected 1 != 2"))
});
