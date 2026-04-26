const UI = {
  screens: {
    title: document.getElementById('title-screen'),
    prologue: document.getElementById('prologue-screen'),
    investigation: document.getElementById('investigation-screen'),
    phase: document.getElementById('phase-screen'),
    clear: document.getElementById('clear-screen')
  },
  prologueText: document.getElementById('prologue-text'),
  prologueImage: document.getElementById('prologue-image'),
  toInvestigateBtn: document.getElementById('to-investigate-btn'),
  
  invDesc: document.getElementById('investigation-desc'),
  spotsContainer: document.getElementById('spots-container'),
  invFeedbackBox: document.getElementById('investigation-feedback'),
  invFeedbackText: document.getElementById('investigation-feedback-text'),
  toPhaseBtn: document.getElementById('to-phase-btn'),

  indicators: {
    plan: document.getElementById('ind-plan'),
    do: document.getElementById('ind-do'),
    check: document.getElementById('ind-check'),
    action: document.getElementById('ind-action')
  },
  phaseTitle: document.getElementById('phase-title'),
  phaseDesc: document.getElementById('phase-desc'),
  cardsContainer: document.getElementById('cards-container'),
  modal: document.getElementById('feedback-modal'),
  feedbackTitle: document.getElementById('feedback-title'),
  feedbackText: document.getElementById('feedback-text'),
  
  finalPoints: document.getElementById('final-points'),
  finalRank: document.getElementById('final-rank'),
  epilogueText: document.getElementById('epilogue-text'),
  secretWord: document.getElementById('secret-word')
};

// State
let currentPhaseIndex = 0;
let isCurrentPhaseClear = false;
let detectivePoints = 100;
let investigatedCount = 0;

// Audio Context
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playSound(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'type') {
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
  } else if (type === 'correct') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
    osc.frequency.setValueAtTime(1108.73, audioCtx.currentTime + 0.1); // C#6
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  } else if (type === 'wrong') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  }
}

// Typewriter Effect
async function typeWriterEffect(element, text, speed = 30) {
  element.innerHTML = '';
  // Remove buttons while typing to prevent skip
  const btns = element.parentElement.querySelectorAll('button');
  btns.forEach(b => b.style.pointerEvents = 'none');
  
  let htmlBuffer = '';
  let i = 0;
  
  while (i < text.length) {
    if (text.substr(i, 4) === '<br>') {
      htmlBuffer += '<br>';
      i += 4;
    } else {
      htmlBuffer += text[i];
      element.innerHTML = htmlBuffer;
      if (text[i] !== ' ') playSound('type');
      i++;
      await new Promise(r => setTimeout(r, speed));
    }
  }
  
  btns.forEach(b => b.style.pointerEvents = 'auto');
}

// Initialization
document.getElementById('start-btn').addEventListener('click', () => {
  detectivePoints = 100;
  investigatedCount = 0;
  currentPhaseIndex = 0;
  switchScreen('prologue');
  loadPrologue();
});

document.getElementById('to-investigate-btn').addEventListener('click', () => {
  switchScreen('investigation');
  loadInvestigation();
});

document.getElementById('to-phase-btn').addEventListener('click', () => {
  switchScreen('phase');
  startPhase(0);
});

document.getElementById('home-btn').addEventListener('click', () => {
  switchScreen('title');
});

document.getElementById('feedback-next-btn').addEventListener('click', () => {
  UI.modal.classList.add('hidden');
  if (isCurrentPhaseClear) {
    currentPhaseIndex++;
    if (currentPhaseIndex >= pdcaData.phases.length) {
      showClearScreen();
    } else {
      startPhase(currentPhaseIndex);
    }
  }
});

function switchScreen(screenName) {
  Object.values(UI.screens).forEach(screen => screen.classList.remove('active'));
  if (UI.screens[screenName]) {
    UI.screens[screenName].classList.add('active');
  }
}

async function loadPrologue() {
  UI.prologueImage.src = pdcaData.prologue.image;
  const formattedText = pdcaData.prologue.text.replace(/\\n/g, '<br>');
  UI.toInvestigateBtn.classList.add('hidden');
  await typeWriterEffect(UI.prologueText, formattedText, 40);
  UI.toInvestigateBtn.classList.remove('hidden');
}

async function loadInvestigation() {
  UI.invFeedbackBox.classList.add('hidden');
  UI.toPhaseBtn.classList.add('hidden');
  UI.spotsContainer.innerHTML = '';
  
  await typeWriterEffect(UI.invDesc, pdcaData.investigation.description, 30);

  pdcaData.investigation.spots.forEach((spot, idx) => {
    const card = document.createElement('div');
    card.className = 'spot-card';
    card.textContent = spot.label;
    card.style.animationDelay = `${idx * 0.1}s`;
    card.onclick = () => handleSpotClick(card, spot);
    UI.spotsContainer.appendChild(card);
  });
}

async function handleSpotClick(cardEl, spot) {
  if (cardEl.classList.contains('investigated')) return;
  
  cardEl.classList.add('investigated');
  investigatedCount++;
  
  UI.invFeedbackBox.classList.remove('hidden');
  await typeWriterEffect(UI.invFeedbackText, spot.text, 30);

  if (investigatedCount >= pdcaData.investigation.spots.length) {
    UI.toPhaseBtn.classList.remove('hidden');
  }
}

async function startPhase(index) {
  currentPhaseIndex = index;
  isCurrentPhaseClear = false;
  const phaseData = pdcaData.phases[index];

  ['plan', 'do', 'check', 'action'].forEach((id, i) => {
    const el = UI.indicators[id];
    el.className = 'phase-indicator';
    if (i < index) el.classList.add('completed');
    if (i === index) el.classList.add('active');
  });

  UI.phaseTitle.textContent = phaseData.name;
  UI.cardsContainer.innerHTML = '';
  
  await typeWriterEffect(UI.phaseDesc, phaseData.description, 30);

  const shuffledCards = [...phaseData.cards].sort(() => 0.5 - Math.random());
  shuffledCards.forEach(card => {
    const cardEl = document.createElement('div');
    cardEl.className = 'card';
    cardEl.innerHTML = `<p class="card-text">${card.text}</p>`;
    cardEl.onclick = () => handleCardClick(card);
    UI.cardsContainer.appendChild(cardEl);
  });
}

function handleCardClick(card) {
  isCurrentPhaseClear = card.isCorrect;
  
  if (card.isCorrect) {
    playSound('correct');
    UI.feedbackTitle.textContent = '推理成功 (SUCCESS!)';
    UI.feedbackTitle.className = 'success';
  } else {
    playSound('wrong');
    detectivePoints = Math.max(0, detectivePoints - 20); // Penalty
    UI.feedbackTitle.textContent = '推理失敗 (FAILED...)';
    UI.feedbackTitle.className = 'fail';
  }
  
  UI.feedbackText.textContent = card.feedback;
  UI.modal.classList.remove('hidden');
}

async function showClearScreen() {
  switchScreen('clear');
  
  // Calc Rank
  let rankStr = 'C';
  let rankClass = 'rank-C';
  if (detectivePoints >= 100) { rankStr = 'S'; rankClass = 'rank-S'; }
  else if (detectivePoints >= 80) { rankStr = 'A'; rankClass = 'rank-A'; }
  else if (detectivePoints >= 60) { rankStr = 'B'; rankClass = 'rank-B'; }
  
  UI.finalPoints.textContent = detectivePoints;
  UI.finalRank.textContent = rankStr;
  UI.finalRank.className = `rank-display ${rankClass}`;

  const formattedText = pdcaData.epilogue.text.replace(/\\n/g, '<br>');
  UI.secretWord.textContent = `「${pdcaData.epilogue.password}」`;
  await typeWriterEffect(UI.epilogueText, formattedText, 40);
}
