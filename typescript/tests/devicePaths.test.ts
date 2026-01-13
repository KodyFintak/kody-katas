import { describe, it, expect } from "vitest";
import { findPath, formatPath } from "../src/devicePaths";

describe("findPath", () => {
  it("returns just the device when start equals end", () => {
    const connections = { A: ["B"] };

    const path = findPath(connections, "A", "A");

    expect(path).toEqual(["A"]);
  });
  it("finds direct path between two connected devices", () => {
    const connections = { A: ["B"] };

    const path = findPath(connections, "A", "B");

    expect(path).toEqual(["A", "B"]);
  });
  it("finds path through one intermediate device", () => {
    const connections = { A: ["B"], B: ["C"] };

    const path = findPath(connections, "A", "C");

    expect(path).toEqual(["A", "B", "C"]);
  });
  it("finds path through multiple intermediate devices", () => {
    const connections = { A: ["B"], B: ["C"], C: ["D"], D: ["E"] };

    const path = findPath(connections, "A", "E");

    expect(path).toEqual(["A", "B", "C", "D", "E"]);
  });
  it("returns null when no path exists between disconnected devices", () => {
    const connections = { A: ["B"], C: ["D"] };

    const path = findPath(connections, "A", "D");

    expect(path).toBeNull();
  });
  it("finds a valid path when multiple routes exist", () => {
    const connections = { A: ["B", "C"], B: ["D"], C: ["D"] };

    const path = findPath(connections, "A", "D");

    expect(path).toContain("A");
    expect(path).toContain("D");
    expect(path![0]).toBe("A");
    expect(path![path!.length - 1]).toBe("D");
  });
  it("returns null when start device doesn't exist", () => {
    const connections = { A: ["B"] };

    const path = findPath(connections, "X", "B");

    expect(path).toBeNull();
  });
  it("returns null when end device doesn't exist", () => {
    const connections = { A: ["B"] };

    const path = findPath(connections, "A", "X");

    expect(path).toBeNull();
  });
  it("handles cycles without infinite loop", () => {
    const connections = { A: ["B"], B: ["C"], C: ["A", "D"] };

    const path = findPath(connections, "A", "D");

    expect(path).toEqual(["A", "B", "C", "D"]);
  });
});

describe("formatPath", () => {
  it("formats a path with arrow notation", () => {
    const path = ["A", "B", "D"];

    const formatted = formatPath(path);

    expect(formatted).toBe("A -> B -> D");
  });

  it("formats a single device path", () => {
    const path = ["A"];

    const formatted = formatPath(path);

    expect(formatted).toBe("A");
  });
});
