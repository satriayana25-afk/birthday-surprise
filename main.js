const startBtn = document.getElementById('startBtn');
const messageDiv = document.getElementById('message');
const mediaSection = document.getElementById('mediaSection');
const music = document.getElementById('music');
const overlay = document.getElementById('overlay');
const overlayImg = overlay.querySelector('img');

const messages = [
  "🎂 Jangan lupa tiup lilinnya yaa 🎂",
  "Selamat ulang tahun yang ke-22, Emma 🥳",
  "Aku bersyukur bisa mengenalmu lebih dalam ❤️",
  "Semoga setiap langkahmu penuh tawa, cahaya, dan kebahagiaan 💐",
  "Selamat ulang tahun ya Emma 🌸",
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

  music.currentTime = 0;
  music.play();

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
        isTyping = false;
      }, 800);
    }
  }

  next();
}

startBtn.addEventListener('click', startTyping);

// Zoom gambar
document.querySelectorAll('#mediaSection img').forEach(img => {
  img.addEventListener('click', () => {
    overlayImg.src = img.src;
    overlay.style.display = 'flex';
  });
});

overlay.addEventListener('click', () => {
  overlay.style.display = 'none';
});
