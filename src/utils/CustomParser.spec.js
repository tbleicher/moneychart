import customParser from "./CustomParser";
import csvstring from "../../data/414.test";

describe("CustomParser", () => {
  let data;

  beforeAll(() => {
    data = customParser(csvstring);
  });

  it("reads CSV files", () => {
    expect(data.length).toEqual(13);
  });

  it("creates objects with a valid date", () => {
    data.forEach(record => {
      expect(record.date.getDate).toBeDefined();
    });
  });

  it("creates objects with a number as 'amount'", () => {
    data.forEach(record => {
      expect(typeof record.amount).toEqual("number");
    });
  });

  it("creates objects with a number as 'balance'", () => {
    data.forEach(record => {
      expect(typeof record.balance).toEqual("number");
    });
  });

  it("creates objects with a string as 'description'", () => {
    data.forEach(record => {
      expect(typeof record.description).toEqual("string");
    });
  });

  it("adds an 'endOfDay' flag to the last record of a day", () => {
    const eod = data.filter(record => record.endOfDay);

    expect(eod.length).toEqual(5);
  });
});
