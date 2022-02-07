import getLetterGrade from "../utils/getLetterGrade";

describe("Letter Grades", () => {
  test("above 90 is an A", () => {
    expect(getLetterGrade(90)).toBe("A");
    expect(getLetterGrade(100)).toBe("A");
    expect(getLetterGrade(91)).toBe("A");
    expect(getLetterGrade(95)).toBe("A");
  });

  test("less than 90 but greater than or equal to 80 is B", () => {
    expect(getLetterGrade(80)).toBe("B");
    expect(getLetterGrade(89)).toBe("B");
    expect(getLetterGrade(85)).toBe("B");
    expect(getLetterGrade(88)).toBe("B");
  });

  test("less than 90 but greater than or equal to 70 is C", () => {
    expect(getLetterGrade(79)).toBe("C");
    expect(getLetterGrade(70)).toBe("C");
    expect(getLetterGrade(72)).toBe("C");
    expect(getLetterGrade(76)).toBe("C");
  });

  test("less than 70 but greater than or equal to 60 is D", () => {
    expect(getLetterGrade(69)).toBe("D");
    expect(getLetterGrade(60)).toBe("D");
    expect(getLetterGrade(62)).toBe("D");
    expect(getLetterGrade(67)).toBe("D");
  });

  test("less than 60 is F", () => {
    expect(getLetterGrade(52)).toBe("F");
    expect(getLetterGrade(59)).toBe("F");
    expect(getLetterGrade(40)).toBe("F");
    expect(getLetterGrade(32)).toBe("F");
  });
});
