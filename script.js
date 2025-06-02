const modes = document.querySelectorAll('.mode-btn');
const startBtn = document.getElementById('start-btn');
const depthSelect = document.getElementById('depth');
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
let questions = [];

const allQuestions = {
  "Ray Mode": {
    light: [
      "What emoji describes me best?",
      "What’s your go-to snack combo?",
      "Do you think I planned this date well, or is it giving chaos?",
      "If I were a dog breed, what would I be?",
      "If I was a candle scent, what would I be?",
      "What’s your biggest flirt move?",
      "What’s your favorite guilty pleasure song?",
      "Would you swipe right on me again?",
      "What’s a silly nickname you’d give me?"
    ],
    deep: [
      "What’s something you wish more people understood about you?",
      "What makes you feel safe around someone?",
      "What’s a dream you’ve never said out loud?",
      "What part of today felt most 'us'?",
      "When did you realize you might like me?",
      "What does 'being seen' mean to you?",
      "What’s a question you wish I’d ask you?",
      "If we dated, what would you be most excited about?"
    ]
  },
  "Benji is Driving": {
    light: [
      "Dogs or cats?",
      "First kiss or last kiss?",
      "If I got arrested tonight, what would it be for?",
      "What’s my rom-com archetype?",
      "Would you rather teleport or time travel?",
      "What’s your go-to Starbucks order?",
      "What’s the most unhinged thing you've done in public?",
      "Pineapple on pizza — yes or no?"
    ],
    deep: [
      "What does 'home' mean to you?",
      "What’s a memory that shaped you?",
      "How do you handle silence on a date?",
      "What’s something you're currently working on emotionally?",
      "When do you feel closest to God?",
      "What’s a family tradition you want to keep going?",
      "What’s something you’ve forgiven someone for but haven’t told them?"
    ]
  },
  "Benji and Them": {
    light: [
      "What would our couple TikTok be like?",
      "If we started a band, what would we be called?",
      "Which rom-com couple are we?",
      "Do you think I could beat you in a dance battle?",
      "What’s your most chaotic trait?",
      "Who’s more dramatic, you or me?",
      "If we were in a reality show, who’s the fan favorite?"
    ],
    deep: [
      "Do you think we’re a good match energy-wise?",
      "What made you say yes to this date?",
      "When do you feel most loved?",
      "What’s something you’d want me to know if we dated?",
      "What’s your biggest fear in relationships?",
      "What’s a love story you admire?",
      "Do you feel like you can be yourself around me?"
    ]
  }
};

modes.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedMode = btn.dataset.mode;
    startBtn.disabled = false;
    modes.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

startBtn.addEventListener('click', () => {
  const tone = depthSelect.value;
  questions = allQuestions[selectedMode][tone];
  document.getElementById('mode-buttons').classList.add('hidden');
  document.getElementById('tone-toggle').classList.add('hidden');
  startBtn.classList.add('hidden');
  questionSection.classList.remove('hidden');
  loadQuestion();
});

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }
  questionText.classList.add('fade-out');
  setTimeout(() => {
    questionText.textContent = questions[currentQuestion];
    questionText.classList.remove('fade-out');
  }, 300);
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
