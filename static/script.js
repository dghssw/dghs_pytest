document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.getElementById("check-answer");
  const studentAnswerInput = document.getElementById("student-answer");
  const resultMessage = document.getElementById("result-message");
  const correctAnswerSpan = document.getElementById("correct-answer");

  checkBtn.addEventListener("click", () => {
    const userAnswer = studentAnswerInput.value.trim();
    const correctAnswer = correctAnswerSpan.textContent.trim();

    // 줄바꿈과 공백 무시한 비교
    if (normalize(userAnswer) === normalize(correctAnswer)) {
      resultMessage.textContent = "정답입니다! 🎉";
      resultMessage.style.color = "green";
    } else {
      resultMessage.textContent = "틀렸어요. 다시 한 번 생각해보세요!";
      resultMessage.style.color = "red";
    }
  });

  // 공백, 줄바꿈 등을 통일해주는 함수
  function normalize(text) {
    return text
      .replace(/\r\n|\r|\n/g, "\n")  // 줄바꿈 통일
      .trim()
      .replace(/[ \t]+/g, " ")       // 공백 여러 개 → 하나
      .replace(/\s+\n/g, "\n")       // 줄 앞 공백 제거
      .replace(/\n\s+/g, "\n")       // 줄 끝 공백 제거
      .toLowerCase();                // 대소문자 구분 안함 (선택사항)
  }
});

if (normalize(userAnswer) === normalize(correctAnswer)) {
  resultMessage.textContent = "정답입니다! 🎉";
  resultMessage.style.color = "green";

  // 정답 공개
  document.getElementById("correct-answer").style.display = "block";
} else {
  resultMessage.textContent = "틀렸어요. 다시 한 번 생각해보세요!";
  resultMessage.style.color = "red";

  // 틀리면 정답은 계속 숨김
  document.getElementById("correct-answer").style.display = "none";
}
