const modes = document.querySelectorAll('.mode-btn');
const startBtn = document.getElementById('start-btn');
const questionSection = document.getElementById('question-section');
const questionText = document.getElementById('question-text');
const rateBtns = document.querySelectorAll('.rate-btn');
const skipBtn = document.getElementById('skip-btn');
const resultsSection = document.getElementById('results-section');
const summaryText = document.getElementById('summary-text');

let selectedMode = null;
let currentQuestion = 0;
let scores = [];
let skipped = 0;

// You can make these mode-dependent later if you want
const questions = [
  "What’s your favorite memory from today so far?",
  "If we could teleport anywhere right now, where would you go?",
  "What’s something new you’ve learned about me tonight?",
  "What’s one thing you’re grateful for in this moment?",
  "On a scale of 1-10, how fun has this date been so far?"
];

modes.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedMode = btn.dataset.mode;
    startBtn.disabled = false;
    modes.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

startBtn.addEventListener('click', () => {
  document.getElementById('mode-buttons').classList.add('hidden');
  startBtn.classList.add('hidden');
  questionSection.classList.remove('hidden');
  loadQuestion();
});

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }
  questionText.textContent = questions[currentQuestion];
}

rateBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    scores.push(Number(btn.dataset.score));
    currentQuestion++;
    loadQuestion();
  });
});

skipBtn.addEventListener('click', () => {
  skipped++;
  currentQuestion++;
  loadQuestion();
});

function showResults() {
  questionSection.classList.add('hidden');
  resultsSection.classList.remove('hidden');
  const average = scores.length ? (scores.reduce((a,b) => a + b) / scores.length).toFixed(2) : "N/A";

  summaryText.innerHTML = `
    <strong>Mode:</strong> ${selectedMode} <br>
    <strong>Total Questions:</strong> ${questions.length} <br>
    <strong>Skipped:</strong> ${skipped} <br>
    <strong>Average Enjoyment Rating:</strong> ${average} ⭐<br><br>
    Thanks for playing — hope the questions made your date even better! 😊
  `;
}
