import { describe, expect, it } from "vitest";

import { getVisiblePages } from "./getVisiblePages";

describe("getVisiblePages", () => {
  it("returns all pages when total is less than three", () => {
    expect(getVisiblePages(1, 2)).toEqual([1, 2]);
  });

  it("returns three pages centered on the current page when possible", () => {
    expect(getVisiblePages(3, 10)).toEqual([2, 3, 4]);
  });

  it("pins to the start when near the beginning", () => {
    expect(getVisiblePages(1, 10)).toEqual([1, 2, 3]);
  });

  it("pins to the end when near the last page", () => {
    expect(getVisiblePages(10, 10)).toEqual([8, 9, 10]);
  });
});
