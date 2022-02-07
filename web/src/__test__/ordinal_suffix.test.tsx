import ordinal_suffix_of from "../utils/ordinal_suffix";

describe("Ordinal Suffix", () => {
  test("1 is 1st", () => {
    expect(ordinal_suffix_of(1)).toBe("1st");
  });

  test("2 is 2nd", () => {
    expect(ordinal_suffix_of(2)).toBe("2nd");
  });

  test("3 is 3rd", () => {
    expect(ordinal_suffix_of(3)).toBe("3rd");
  });

  test("4 is 4th", () => {
    expect(ordinal_suffix_of(4)).toBe("4th");
  });

  test("5 is 5th", () => {
    expect(ordinal_suffix_of(5)).toBe("5th");
  });

  test("6 is 6th", () => {
    expect(ordinal_suffix_of(6)).toBe("6th");
  });

  test("7 is 7th", () => {
    expect(ordinal_suffix_of(7)).toBe("7th");
  });

  test("8 is 8th", () => {
    expect(ordinal_suffix_of(8)).toBe("8th");
  });
});
