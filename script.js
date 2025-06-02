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

const questions = [
  "How satisfied are you with today's experience?",
  "How well did this meet your expectations?",
  "Would you recommend this to a friend?"
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
  summaryText.textContent = `
    Mode: ${selectedMode}
    Total Questions: ${questions.length}
    Skipped: ${skipped}
    Average Satisfaction Score: ${average}
  `;
}
