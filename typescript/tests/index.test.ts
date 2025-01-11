import {expect, it} from "../src/kdd";

it("1 equals 1", () => {
    expect(1).toEqual(1)
})

it('1 does not equal 2', () => {
    expect(1).toEqual(2)
});

it('true equals true', () => {
    expect(true).toEqual(true)
});

it('true is not equal to false', () => {
    expect(true).toEqual(false)
});

it('[1] is equal to [1]', () => {
    expect([1]).toEqual([1])
});

it('[1] is not equal to [2]', () => {
    expect([1]).toEqual([2])
});