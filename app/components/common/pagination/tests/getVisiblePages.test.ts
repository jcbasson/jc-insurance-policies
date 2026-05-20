import { describe, expect, it } from "vitest";

import { getVisiblePages } from "../getVisiblePages";

describe("getVisiblePages", () => {
  it("returns all pages when total is less than three", () => {
    expect(getVisiblePages(1, 2)).toEqual([1, 2]);
  });

  it("returns the first chunk for pages in the first group", () => {
    expect(getVisiblePages(2, 10)).toEqual([1, 2, 3]);
    expect(getVisiblePages(3, 10)).toEqual([1, 2, 3]);
  });

  it("returns the middle chunk for pages in the middle group", () => {
    expect(getVisiblePages(4, 10)).toEqual([4, 5, 6]);
    expect(getVisiblePages(5, 10)).toEqual([4, 5, 6]);
    expect(getVisiblePages(6, 10)).toEqual([4, 5, 6]);
  });

  it("pins to the start when in the first chunk", () => {
    expect(getVisiblePages(1, 10)).toEqual([1, 2, 3]);
  });

  it("pins to the end when on the final page beyond a full chunk", () => {
    expect(getVisiblePages(7, 10)).toEqual([7, 8, 9]);
    expect(getVisiblePages(8, 10)).toEqual([7, 8, 9]);
    expect(getVisiblePages(9, 10)).toEqual([7, 8, 9]);
    expect(getVisiblePages(10, 10)).toEqual([8, 9, 10]);
  });
});
