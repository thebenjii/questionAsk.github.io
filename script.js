const modeSelect = document.getElementById('mode');
const toneSelect = document.getElementById('tone');
const startBtn = document.getElementById('start-btn');
const questionSection = document.getElementById('question-section');
const questionText = document.getElementById('question-text');
const rateBtns = document.querySelectorAll('.rate-btn');
const skipBtn = document.getElementById('skip-btn');
const endBtn = document.getElementById('end-btn');
const resultsSection = document.getElementById('results-section');
const summaryText = document.getElementById('summary-text');

let currentMode = modeSelect.value;
let currentTone = toneSelect.value;
let questions = [];
let currentQuestion = 0;
let scores = [];
let skipped = 0;

const allQuestions = {
  "Ray Mode": {
    light: [
      "What emoji describes me best?",
      "What’s your go-to snack combo?",
      "Do you think I planned this date well, or is it giving chaos?",
      "If I were a dog breed, what would I be?"
    ],
    deep: [
      "What’s something you wish more people understood about you?",
      "What makes you feel safe around someone?",
      "What part of today felt most 'us'?",
      "When did you realize you might like me?"
    ]
  },
  "Benji is Driving": {
    light: [
      "Dogs or cats?",
      "If I got arrested tonight, what would it be for?",
      "What’s my rom-com archetype?",
      "What’s your go-to Starbucks order?"
    ],
    deep: [
      "What does 'home' mean to you?",
      "What’s a memory that shaped you?",
      "What’s something you're currently working on emotionally?"
    ]
  },
  "Benji and Them": {
    light: [
      "What would our couple TikTok be like?",
      "If we started a band, what would we be called?",
      "Do you think I could beat you in a dance battle?"
    ],
    deep: [
      "Do you think we’re a good match energy-wise?",
      "What made you say yes to this date?",
      "What’s something you’d want me to know if we dated?"
    ]
  }
};

function loadSettings() {
  currentMode = modeSelect.value;
  currentTone = toneSelect.value;
  questions = [...allQuestions[currentMode][currentTone]];
  currentQuestion = 0;
  scores = [];
  skipped = 0;
  resultsSection.classList.add('hidden');
  questionSection.classList.remove('hidden');
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion >= questions.length) return showResults();

  questionText.classList.add('fade-out');
  setTimeout(() => {
    questionText.textContent = questions[currentQuestion];
    questionText.classList.remove('fade-out');
  }, 300);
}

function showResults() {
  questionSection.classList.add('hidden');
  resultsSection.classList.remove('hidden');
  const avg = scores.length ? (scores.reduce((a, b) => a + b) / scores.length).toFixed(2) : "N/A";
  summaryText.innerHTML = `
    <strong>Mode:</strong> ${currentMode}<br>
    <strong>Tone:</strong> ${currentTone}<br>
    <strong>Total Questions:</strong> ${questions.length}<br>
    <strong>Skipped:</strong> ${skipped}<br>
    <strong>Avg Enjoyment:</strong> ${avg} ⭐<br><br>
    Thanks for playing — hope this made your time together better 💖
  `;
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

endBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to end the session?")) {
    showResults();
  }
});

startBtn.addEventListener('click', loadSettings);

modeSelect.addEventListener('change', () => {
  if (questionSection.classList.contains('hidden')) return;
  loadSettings();
});

toneSelect.addEventListener('change', () => {
  if (questionSection.classList.contains('hidden')) return;
  loadSettings();
});
