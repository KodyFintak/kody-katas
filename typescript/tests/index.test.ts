import {expect, given, it} from "../src/kdd";

given("testing toEqual", () => {
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

    it('{a: 1} is equal to {a: 1}', () => {
        expect({a: 1}).toEqual({a: 1})
    });

    it('object is equal to same object in different order', () => {
        expect({a: 1, b: 1}).toEqual({b: 1, a: 1})
    });
})

given("testing toContain", () => {
    it('apple contains pl', () => {
        expect('apple').toContain('pl')
    });

    it('apple does not contain you', () => {
        expect('apple').toContain('you')
    });

    it('[1] contains 1', () => {
        expect([1]).toContain(1)
    });

    it('[1] does not contain 2', () => {
        expect([1]).toContain(2)
    });

    it('[{a: 1}] contains {a: 1}', () => {
        expect([{a: 1}]).toContain({a: 1})
    });

    it('[{a: 1}] does not contains {b: 1}', () => {
        expect([{a: 1}]).toContain({b: 1})
    });

    it('array of objects contains object with different order', () => {
        expect([{a: 1, b: 1}]).toContain({b: 1, a: 1})
    });
})