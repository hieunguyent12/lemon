import { GRADE_COLORS } from "../constants";

export function getGradeColor(grade: number | undefined | null) {
  if (!grade) {
    return null;
  }

  if (grade < 50) {
    return GRADE_COLORS[50];
  } else {
    return GRADE_COLORS[
      (Math.floor((grade as any) / 10) * 10) as keyof typeof GRADE_COLORS
    ];
  }
}
