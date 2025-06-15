const sentenceEl = document.getElementById("sentence");
const inputArea = document.getElementById("inputArea");
const timeEl = document.getElementById("time");
const wpmEl = document.getElementById("wpm");

const sentences = [
  "Practice makes perfect.",
  "Typing fast takes time and effort.",
  "JavaScript is fun and powerful.",
  "Internships help gain experience.",
  "Learning code is a valuable skill."
];

let startTime, timer, currentSentence;

function startTest() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceEl.textContent = currentSentence;
  inputArea.value = "";
  inputArea.disabled = false;
  inputArea.focus();

  timeEl.textContent = "0";
  wpmEl.textContent = "0";

  startTime = new Date();
  timer = setInterval(updateTime, 1000);

  inputArea.addEventListener("input", checkInput);
}

function updateTime() {
  const currentTime = new Date();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  timeEl.textContent = elapsedTime;
}

function checkInput() {
  const typedText = inputArea.value;

  if (typedText === currentSentence) {
    clearInterval(timer);
    inputArea.disabled = true;

    const totalTime = Math.floor((new Date() - startTime) / 1000);
    const wordCount = currentSentence.split(" ").length;
    const wpm = Math.round((wordCount / totalTime) * 60);

    timeEl.textContent = totalTime;
    wpmEl.textContent = wpm;
  }
}

function stopTest() {
  clearInterval(timer);
  inputArea.disabled = true;

  const typedText = inputArea.value.trim();
  const wordsTyped = typedText === "" ? 0 : typedText.split(/\s+/).length;

  const totalTime = Math.floor((new Date() - startTime) / 1000);
  const wpm = totalTime > 0 ? Math.round((wordsTyped / totalTime) * 60) : 0;

  timeEl.textContent = totalTime;
  wpmEl.textContent = wpm;
}

function resetTest() {
  clearInterval(timer);
  inputArea.value = "";
  sentenceEl.textContent = "Click \"Start\" to begin typing test.";
  timeEl.textContent = "0";
  wpmEl.textContent = "0";
  inputArea.disabled = true;
}
