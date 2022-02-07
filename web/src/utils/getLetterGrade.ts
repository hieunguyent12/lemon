export default function getLetterGrade(grade: number | undefined) {
  if (!grade) {
    return "Unknown grade";
  }

  if (grade >= 90) {
    return "A";
  } else if (grade < 90 && grade >= 80) {
    return "B";
  } else if (grade < 80 && grade >= 70) {
    return "C";
  } else if (grade < 70 && grade >= 60) {
    return "D";
  } else {
    return "F";
  }
}
