let timer;
let running = false;
let startTime;
let pausedTime = 0;

const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap');
const lapsList = document.querySelector('.laps');

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
  const elapsed = running ? Date.now() - startTime + pausedTime : pausedTime;
  display.textContent = formatTime(elapsed);
}

function startTimer() {
  if (!running) {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 10);
    running = true;
  }
}

function pauseTimer() {
  if (running) {
    clearInterval(timer);
    running = false;
    pausedTime += Date.now() - startTime;
  }
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  pausedTime = 0;
  updateDisplay();
  lapsList.innerHTML = '';
}

function lapTimer() {
  if (running) {
    const lapTime = Date.now() - startTime + pausedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapsList.appendChild(lapItem);
  }
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);
