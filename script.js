// script.js
import { tracks } from "./scripts.js";

const audio = document.getElementById("audio");
const playButton = document.getElementById("play");
const repeatButton = document.getElementById("repeat");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const toggleScriptButton = document.getElementById("toggle-script");
const scriptDiv = document.getElementById("script");
const scriptText = document.getElementById("script-text");
const progressBar = document.getElementById("progress-bar");
const darkModeBtn = document.getElementById("dark-mode-btn");

let currentTrack = 0;

function loadTrack(index) {
  audio.src = tracks[index].src;
  scriptText.textContent = tracks[index].script;
  playButton.textContent = "▶️ Play"; // Reset Play Button
}

playButton.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playButton.textContent = "⏸️ Pause";
  } else {
    audio.pause();
    playButton.textContent = "▶️ Play";
  }
});

repeatButton.addEventListener("click", () => {
  audio.currentTime = 0;
  audio.play();
  playButton.textContent = "⏸️ Pause";
});

prevButton.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
  playButton.textContent = "⏸️ Pause";
});

nextButton.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  loadTrack(currentTrack);
  audio.play();
  playButton.textContent = "⏸️ Pause";
});

toggleScriptButton.addEventListener("click", () => {
  scriptDiv.classList.toggle("hidden");
  toggleScriptButton.textContent = scriptDiv.classList.contains("hidden")
    ? "📖 Show Script"
    : "📖 Hide Script";
});

// Progress Bar Update
audio.addEventListener("timeupdate", () => {
  if (!isNaN(audio.duration)) {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
  }
});

// Allow user to scrub through audio
progressBar.addEventListener("input", () => {
  audio.currentTime = progressBar.value;
});

// Dark Mode Toggle
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    darkModeBtn.textContent = "☀️ Light Mode";
  } else {
    darkModeBtn.textContent = "🌙 Dark Mode";
  }
});

window.addEventListener("load", () => {
  loadTrack(currentTrack);
});
