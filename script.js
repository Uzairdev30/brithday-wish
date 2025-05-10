const music = document.getElementById("bg-music");
const tickSound = document.getElementById("tick-sound");
const timeDisplay = document.getElementById("time");
const dateDisplay = document.getElementById("date");
const datetimeBox = document.getElementById("datetimeBox");
const heartMessage = document.getElementById("heartMessage");

const times = [
  "11:59:55  (PM)",
  "11:59:56  (PM)",
  "11:59:57  (PM)",
  "11:59:58  (PM)",
  "11:59:59  (PM)",
  "12:00:00  (AM)"
];

let index = 0;
let interval;
let isStarted = false; // Prevent multiple triggers on mobile

function createBalloon(color) {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.style.backgroundColor = color;
  balloon.style.left = `${Math.random() * 100}%`;
  document.getElementById('celebration').appendChild(balloon);
  setTimeout(() => balloon.remove(), 5000);
}

function createConfetti() {
  const confetti = document.createElement('div');
  confetti.className = 'confetti';
  confetti.style.left = `${Math.random() * 100}%`;
  confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
  document.getElementById('celebration').appendChild(confetti);
  setTimeout(() => confetti.remove(), 5000);
}

function triggerCelebration() {
  const colors = ['#ff4d6d', '#ffc300', '#8ac926', '#1982c4', '#6a4c93'];
  for (let i = 0; i < 70; i++) {
    setTimeout(() => {
      createBalloon(colors[Math.floor(Math.random() * colors.length)]); 
    }, i * 500);
  }

  for (let i = 0; i < 50; i++) {
    setTimeout(() => createConfetti(), i * 500); 
  }

  setTimeout(() => {
    datetimeBox.style.display = 'none';
    heartMessage.style.display = 'block';
    document.body.classList.add('flash-screen');

    const againBtn = document.createElement('button');
    againBtn.textContent = "🔁 Back";
    againBtn.onclick = () => location.reload();
    againBtn.style.marginTop = "25px";
    againBtn.style.padding = "10px 20px";
    againBtn.style.borderRadius = "30px";
    againBtn.style.border = "2px solid rgba(255, 215, 0, 0.4)";
    againBtn.style.background = "rgba(255, 255, 255, 0.05)";
    againBtn.style.backdropFilter = "blur(10px)";
    againBtn.style.color = "#FFD700";
    againBtn.style.fontWeight = "600";
    againBtn.style.fontSize = "0.95rem";
    againBtn.style.boxShadow = "0 0 15px rgba(255, 215, 0, 0.6)";
    againBtn.style.transition = "all 0.3s ease";
    againBtn.style.cursor = "pointer";
    againBtn.style.animation = "pulse 2s infinite alternate";
    againBtn.onmouseover = () => {
      againBtn.style.background = "rgba(255, 215, 0, 0.2)";
    };
    againBtn.onmouseleave = () => {
      againBtn.style.background = "rgba(255, 255, 255, 0.05)";
    };
    heartMessage.appendChild(againBtn);

  }, 1000); 

  const birthdaySong = new Audio("happy-birthday-314197.mp3");
  birthdaySong.play();

  setTimeout(() => {
    location.reload();
  }, 28000);
}

function startEverything() {
  if (isStarted) return;
  isStarted = true;

  music.play();

  setTimeout(() => {
    tickSound.play();
    tickSound.volume = 0.1;
  }, 2000); 

  datetimeBox.style.display = 'block';

  interval = setInterval(() => {
    timeDisplay.textContent = times[index];

    if (index === times.length - 1) {
      dateDisplay.textContent = "Date: 30 May 2025 ";
      clearInterval(interval);
      triggerCelebration();
    }

    index++;
  }, 1000);
}
