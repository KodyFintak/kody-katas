import { describe, it, expect } from "vitest";
import { bottles, verse, sing } from "../src/bottles";

describe("bottles", () => {
  describe("bottles()", () => {
    it("returns 'no more bottles' for 0", () => {
      expect(bottles(0)).toBe("no more bottles");
    });

    it("returns '1 bottle' for 1 (singular)", () => {
      expect(bottles(1)).toBe("1 bottle");
    });

    it("returns '2 bottles' for 2 (plural)", () => {
      expect(bottles(2)).toBe("2 bottles");
    });

    it("returns '99 bottles' for 99", () => {
      expect(bottles(99)).toBe("99 bottles");
    });
  });

  describe("verse()", () => {
    it("returns the verse for 99 bottles", () => {
      expect(verse(99)).toBe(
        "99 bottles of soda on the wall, 99 bottles of soda.\n" +
          "Take one down and pass it around, 98 bottles of soda on the wall."
      );
    });

    it("returns the verse for 3 bottles", () => {
      expect(verse(3)).toBe(
        "3 bottles of soda on the wall, 3 bottles of soda.\n" +
          "Take one down and pass it around, 2 bottles of soda on the wall."
      );
    });

    it("returns the verse for 2 bottles", () => {
      expect(verse(2)).toBe(
        "2 bottles of soda on the wall, 2 bottles of soda.\n" +
          "Take one down and pass it around, 1 bottle of soda on the wall."
      );
    });

    it("returns the verse for 1 bottle (singular to no more)", () => {
      expect(verse(1)).toBe(
        "1 bottle of soda on the wall, 1 bottle of soda.\n" +
          "Take one down and pass it around, No more bottles of soda on the wall."
      );
    });

    it("returns the verse for 0 (no more bottles)", () => {
      expect(verse(0)).toBe(
        "No more bottles of soda on the wall, no more bottles of soda.\n" +
          "Go to the store and buy some more, 99 bottles of soda on the wall."
      );
    });
  });

  describe("sing()", () => {
    it("sings the entire song from 99 to 0 by default", () => {
      const song = sing();
      const verses = song.split("\n\n");
      expect(verses).toHaveLength(100);
      expect(verses[0]).toBe(verse(99));
      expect(verses[99]).toBe(verse(0));
    });

    it("sings from a custom starting point", () => {
      const song = sing(3);
      const verses = song.split("\n\n");
      expect(verses).toHaveLength(4);
      expect(verses[0]).toBe(verse(3));
      expect(verses[3]).toBe(verse(0));
    });

    it("sings a range of verses", () => {
      const song = sing(5, 3);
      const verses = song.split("\n\n");
      expect(verses).toHaveLength(3);
      expect(verses[0]).toBe(verse(5));
      expect(verses[1]).toBe(verse(4));
      expect(verses[2]).toBe(verse(3));
    });

    it("sings a single verse when start equals end", () => {
      const song = sing(5, 5);
      expect(song).toBe(verse(5));
    });

    it("handles singing just the last verse", () => {
      const song = sing(0, 0);
      expect(song).toBe(verse(0));
    });

    it("includes proper line breaks between verses", () => {
      const song = sing(2, 1);
      expect(song).toContain("\n\n");
      expect(song.split("\n\n")).toHaveLength(2);
    });
  });
});
