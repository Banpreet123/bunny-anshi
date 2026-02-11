const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const funnyText = document.getElementById("funnyText");
const introMusic = document.getElementById("introMusic");
const loveMusic = document.getElementById("loveMusic");

introMusic.play();

const funnyMessages = [
  "Nice try 😏",
  "Destiny says NO to No 😌",
  "Come on, click YES already 💕",
  "Wrong button, love 😘"
];

noBtn.addEventListener("mouseover", () => {
  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random() * 80 + "%";
  noBtn.style.top = Math.random() * 80 + "%";
  funnyText.textContent =
    funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
});

/* YES CLICK */
yesBtn.addEventListener("click", () => {
  document.getElementById("introText").remove();
  document.querySelector(".buttons").remove();

  document.getElementById("yayText").classList.remove("hidden");

  introMusic.pause();
  loveMusic.play();

  createHearts();
  popConfetti();

  setTimeout(() => {
    startTypewriter();
    startCounter();
    document.getElementById("whyLove").classList.remove("hidden");
  }, 1000);
});

/* ❤️ Floating hearts */
function createHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "absolute";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.bottom = "0";
    heart.style.fontSize = "24px";
    document.body.appendChild(heart);

    heart.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-100vh)" }],
      { duration: 6000 }
    );

    setTimeout(() => heart.remove(), 6000);
  }, 400);
}

/* 🎉 Confetti */
function popConfetti() {
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.innerHTML = "💗";
    confetti.style.position = "absolute";
    confetti.style.left = i % 2 === 0 ? "0" : "100%";
    confetti.style.bottom = "0";
    document.body.appendChild(confetti);

    confetti.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-80vh)" }],
      { duration: 3000 }
    );

    setTimeout(() => confetti.remove(), 3000);
  }
}

/* ✍️ Typewriter */
function startTypewriter() {
  const text =
    "Anshi Srivastava ❤️\nWill you be my forever Valentine?\nLove, Bunny 🧸";
  let i = 0;
  const el = document.getElementById("typewriter");
  el.classList.remove("hidden");

  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 70);
}

/* ⏳ Counter */
function startCounter() {
  const counter = document.getElementById("counter");
  counter.classList.remove("hidden");

  const startDate = new Date("2023-09-22");
  setInterval(() => {
    const diff = Date.now() - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    counter.textContent = `Since we met: ${days} days 💕`;
  }, 1000);
}
