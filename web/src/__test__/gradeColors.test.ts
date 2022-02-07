import { GRADE_COLORS } from "../constants/index";
import { getGradeColor } from "../utils/getGradeColor";

describe("Grades Colors", () => {
  test("90 and above is green", () => {
    expect(getGradeColor(98)).toBe(GRADE_COLORS[90]);
    expect(getGradeColor(100)).toBe(GRADE_COLORS[100]);
  });

  test("80 and above but less than 90 is lime", () => {
    expect(getGradeColor(82)).toBe(GRADE_COLORS[80]);
    expect(getGradeColor(80)).toBe(GRADE_COLORS[80]);
  });

  test("70 and above but less than 80 is yellow", () => {
    expect(getGradeColor(72)).toBe(GRADE_COLORS[70]);
    expect(getGradeColor(70)).toBe(GRADE_COLORS[70]);
  });

  test("60 and above but less than 70 is yellow but darker", () => {
    expect(getGradeColor(69)).toBe(GRADE_COLORS[60]);
    expect(getGradeColor(60)).toBe(GRADE_COLORS[60]);
  });

  test("any grades under a 60 is orange", () => {
    expect(getGradeColor(59)).toBe(GRADE_COLORS[50]);
    expect(getGradeColor(50)).toBe(GRADE_COLORS[50]);
    expect(getGradeColor(32)).toBe(GRADE_COLORS[50]);
    expect(getGradeColor(49)).toBe(GRADE_COLORS[50]);
  });
});

// export {};
