function CalculatePoints(subject) {
  let grade = "";
  let point = 0;
  let total = subject.total;

  if (subject.tee === 0 || subject.tee === "") {
    total *= 2;
  }

  if (subject.tee < 40 && (subject.tee != 0 || subject.tee != "")) {
    grade = "F";
    point = 0;
  } else if (total >= 85) {
    grade = "A+";
    point = 4;
  } else if (total < 85 && total >= 81) {
    grade = "A";
    point = 3.75;
  } else if (total < 81 && total >= 77) {
    grade = "A-";
    point = 3.5;
  } else if (total < 77 && total >= 73) {
    grade = "B+";
    point = 3.25;
  } else if (total < 73 && total >= 69) {
    grade = "B";
    point = 3;
  } else if (total < 69 && total >= 65) {
    grade = "B-";
    point = 2.75;
  } else if (total < 65 && total >= 61) {
    grade = "C+";
    point = 2.5;
  } else if (total < 61 && total >= 57) {
    grade = "C";
    point = 2.25;
  } else if (total < 57 && total >= 50) {
    grade = "C-";
    point = 2;
  } else if (total < 50 && total >= 40) {
    grade = "D";
    point = 1.5;
  } else {
    grade = "F";
    point = 0;
  }

  return { grade, point };
}
export default CalculatePoints;