// JavaScript for Stopwatch Functionality

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

// DOM Elements
const displayElement = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsElement = document.getElementById('laps');

// Format time to display as MM:SS:ms
function formatTime(time) {
    let milliseconds = time % 1000;
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);

    milliseconds = milliseconds.toString().padStart(3, '0');
    seconds = seconds.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');

    return `${minutes}:${seconds}:${milliseconds}`;
}

// Start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
    }
}

// Pause the stopwatch
function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timerInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    displayElement.textContent = "00:00:00.000";
    lapsElement.innerHTML = ''; // Clear laps
}

// Update the stopwatch display
function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    displayElement.textContent = formatTime(elapsedTime);
}

// Record a lap time
function recordLap() {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapsElement.children.length + 1}: ${lapTime}`;
        lapsElement.appendChild(lapItem);
    }
}

// Event listeners
startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
