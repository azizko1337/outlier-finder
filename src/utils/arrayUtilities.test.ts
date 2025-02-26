import { expect, test } from "vitest";

import { findArrayOutlier } from "./arrayUtilities";

test("findArrayOutlier small array", () => {
  expect(findArrayOutlier([2, 4, 0, 100, 4, 11, 2602, 36])).toBe(11);
  expect(findArrayOutlier([160, 3, 1719, 19, 11, 13, -21])).toBe(160);
});

test("findArrayOutlier 100kk array", () => {
  const array = [];
  for (let i = 0; i < 100000000; i += 2) array.push(i);
  array.push(1);

  expect(findArrayOutlier(array)).toBe(1);
});
