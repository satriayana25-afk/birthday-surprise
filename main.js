const startBtn = document.getElementById('startBtn');
const messageDiv = document.getElementById('message');
const mediaSection = document.getElementById('mediaSection');
const music = document.getElementById('music');

const messages = [
  "🎂 Jangan lupa tiup lilinnya yaa 🎂",
  "Selamat ulang tahun yang ke-22, Salma 🥳",
  "Aku bersyukur bisa mengenalmu lebih dalam ❤️",
  "Semoga setiap langkahmu penuh tawa, cahaya, dan kebahagiaan 💐",
  "Selamat ulang tahun ya Salma 🌸",
  "Barakallah fii umrik 🤍"
];

function typeMessage(text, callback) {
  let index = 0;
  const speed = 50;
  const p = document.createElement('p');
  p.classList.add('line');
  messageDiv.appendChild(p);

  function typing() {
    if (index < text.length) {
      p.textContent += text.charAt(index);
      index++;
      setTimeout(typing, speed);
    } else if (callback) {
      setTimeout(callback, 600);
    }
  }

  typing();
}

let isTyping = false;

function startTyping() {
  if (isTyping) return;
  isTyping = true;
  startBtn.disabled = true;

  music.currentTime = 0;
  music.play().catch(err => console.warn("Audio gagal diputar:", err));

  messageDiv.innerHTML = '';
  mediaSection.classList.add('hidden');

  let i = 0;
  function next() {
    if (i < messages.length) {
      typeMessage(messages[i], next);
      i++;
    } else {
      setTimeout(() => {
        mediaSection.classList.remove('hidden');
        mediaSection.style.opacity = 0;
        let opacity = 0;
        const fadeIn = setInterval(() => {
          opacity += 0.05;
          mediaSection.style.opacity = opacity;
          if (opacity >= 1) clearInterval(fadeIn);
        }, 30);
        isTyping = false;
        startBtn.disabled = false;
      }, 800);
    }
  }

  next();
}

startBtn.addEventListener('click', startTyping);
