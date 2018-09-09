import { generateCSVLines } from "./testData";

describe("generateCSVLines", () => {
  it.skip("generates a list of specified length", () => {
    const lines = generateCSVLines(30);
    expect(lines.length).toEqual(19);
  });
});
