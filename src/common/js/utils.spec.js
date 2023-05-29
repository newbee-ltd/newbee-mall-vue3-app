import { describe, it, expect } from "vitest";
import { tdist } from "./utils";

describe("utils", () => {
  const keys = Object.keys(tdist);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  it("tdist.getLev1", () => {
    const lev1 = tdist.getLev1();
    const index = Math.floor(Math.random() * lev1.length);
    const node = lev1[index];
    expect(node).toHaveProperty("id");
    expect(node).toHaveProperty("text");
    expect(node.text).toBe(tdist[node.id][0]);
  });
  it("tdist.getLev2", () => {
    const lev2 = tdist.getLev2(randomKey);
    const index = Math.floor(Math.random() * lev2.length);
    const node = lev2[index];
    expect(node).toHaveProperty("id");
    expect(node).toHaveProperty("text");
    expect(tdist.getLev2("")).toEqual([]);
    expect(node.text).toBe(tdist[node.id][0]);
  });
  it("tdist.getLev3", () => {
    const lev3 = tdist.getLev3(randomKey);
    const index = Math.floor(Math.random() * lev3.length);
    const node = lev3[index];
    expect(node).toHaveProperty("id");
    expect(node).toHaveProperty("text");
    expect(tdist.getLev3("")).toEqual([]);
    expect(node.text).toBe(tdist[node.id][0]);
  });
});
