const yesBtn = document.getElementById("yesBtn");
const proposalBox = document.getElementById("proposalBox");
const heartsContainer = document.querySelector(".hearts");
const music = document.getElementById("bgMusic");
const introMusic = document.getElementById("introMusic");
const loveMusic = document.getElementById("loveMusic");
const noBtn = document.getElementById("noBtn");
const funnyText = document.getElementById("funnyText");

let introStarted = false;

function startIntroMusicOnce() {
  if (introStarted) return;

  introStarted = true;

  introMusic.volume = 0.6;
  introMusic.play()
    .then(() => {
      console.log("Intro music started");
    })
    .catch(err => {
      console.log("Autoplay blocked:", err);
    });

  // Remove listeners after first play
  document.removeEventListener("click", startIntroMusicOnce);
  document.removeEventListener("touchstart", startIntroMusicOnce);
  document.removeEventListener("keydown", startIntroMusicOnce);
}

// User interaction listeners
document.addEventListener("click", startIntroMusicOnce, { once: true });
document.addEventListener("touchstart", startIntroMusicOnce, { once: true });
document.addEventListener("keydown", startIntroMusicOnce, { once: true });


const noMessages = [
  "Nice try 😏",
  "You can’t escape destiny 💘",
  "Come on… click YES already 🥹",
  "I know you want to 😌",
  "Wrong button 😛",
  "That button doesn’t work 😜",
  "Be honest… you smiled just now ❤️"
];



yesBtn.addEventListener("click", () => {
    document.getElementById("introText").style.display = "none";
  document.getElementById("yayText").classList.remove("hidden");
  funnyText.textContent = "";

  // 🎉 Confetti pops immediately
  popConfetti("left");
  popConfetti("right");

  // 💕 Start floating hearts
  startHearts();

  setTimeout(() => {
    proposalBox.classList.remove("hidden");
    document.querySelector(".buttons").remove();

    // 🎵 Music switch
    fadeOutIntroAndPlayLove();


    startTypewriter();
    // startCounter();
  }, 800);
});

function fadeOutIntroAndPlayLove() {
  let vol = introMusic.volume;

  const fade = setInterval(() => {
    vol -= 0.05;
    if (vol <= 0) {
      clearInterval(fade);
      introMusic.pause();
      introMusic.currentTime = 0;
      loveMusic.volume = 0.7;
      loveMusic.play();
    } else {
      introMusic.volume = vol;
    }
  }, 100);
}


function startHearts() {
  const container = document.getElementById("heart-container");

  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 18 + "px";
    heart.style.animationDuration = Math.random() * 3 + 4 + "s";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
  }, 400);
}


function popConfetti(side) {
  const count = 50;

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";

    const offsetX = Math.random() * 120;

    confetti.style.left =
      side === "left"
        ? `${20 + offsetX}px`
        : `calc(100% - ${20 + offsetX}px)`;

    confetti.style.bottom = "0px";

    confetti.style.backgroundColor =
      ["#ff4d6d", "#ffd6e0", "#fff", "#ffafcc"][
        Math.floor(Math.random() * 4)
      ];

    confetti.style.animationDelay = `${Math.random() * 0.3}s`;

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 2000);
  }
}

// /* NO button escapes */
// noBtn.addEventListener("mouseover", () => {
//   const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
//   const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
//   noBtn.style.position = "absolute";
//   noBtn.style.left = x + "px";
//   noBtn.style.top = y + "px";
// });
noBtn.addEventListener("click", () => {
  const msg = noMessages[Math.floor(Math.random() * noMessages.length)];
  funnyText.textContent = msg;

  const x = Math.random() * 200 - 100;
  const y = Math.random() * 120 - 60;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});


/* Floating hearts */
function createHeart() {
  const heart = document.createElement("span");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 3 + 5) + "s";
  heart.style.fontSize = (Math.random() * 10 + 15) + "px";
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}
setInterval(createHeart, 300);

function toggleMusic() {
  if (!loveMusic.paused) {
    loveMusic.pause();
  } else if (!introMusic.paused) {
    introMusic.pause();
  } else {
    loveMusic.play();
  }
}


/* Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti() {
  for (let i = 0; i < 300; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 40 + 10,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`
    });
  }
  requestAnimationFrame(drawConfetti);
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.fill();
    c.y += Math.cos(c.d) + 3;
  });
  requestAnimationFrame(drawConfetti);
}
document.addEventListener("click", () => {
  document.getElementById("tapHint")?.remove();
}, { once: true });


/* Typewriter effect */
const proposalText = `
Anshi my love,
Seriously every smile of yours feels like home to me.
Aapki ek muskurahat mere saare din ko roshan kar deti hai yrr love.
I don’t want just a Valentine’s Day with you —
I want every single day with you. 💍
`;

let index = 0;

function startTypewriter() {
  const el = document.getElementById("typewriter");
  const after = document.getElementById("afterTypewriter");

  el.innerHTML = "";
  after.classList.add("hidden");
  index = 0;

  function type() {
    if (index < proposalText.length) {
      el.innerHTML += proposalText[index] === "\n"
        ? "<br>"
        : proposalText[index];
      index++;
      setTimeout(type, 60);
    } else {
      // ✨ Typing finished
      setTimeout(() => {
        after.classList.remove("hidden");
        startCounter(); // start counter only now
      }, 500);
    }
  }

  type();
}


// CHANGE THIS DATE 👇 (YYYY, MM-1, DD)
const MET_DATE = new Date(2025, 8, 29); // Example: Jan 15, 2024

function startCounter() {
  const counterEl = document.getElementById("timeTogether");

  function updateCounter() {
    const now = new Date();
    let start = new Date(MET_DATE);

    let months = 0;

    // Count full months
    while (true) {
      let nextMonth = new Date(start);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      if (nextMonth <= now) {
        start = nextMonth;
        months++;
      } else {
        break;
      }
    }

    // Remaining days after full months
    const diffMs = now - start;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    counterEl.textContent = `${months} months & ${days} days of us ❤️`;

  }

  updateCounter();
  setInterval(updateCounter, 60 * 60 * 1000); // update hourly
}


const reasons = [
  "Your smile makes everything feel okay",
  "The way you understand me without words",
  "How you make me want to be better",
  "Your kindness and patience",
  "The way you call me Bunny 🧸",
  "Because life feels right with you"
];

function showReasons() {
  const container = document.getElementById("reasons");
  const list = document.getElementById("reasonsList");

  container.classList.remove("hidden");

  reasons.forEach((reason, i) => {
    const li = document.createElement("li");
    li.textContent = "• " + reason;
    list.appendChild(li);

    setTimeout(() => {
      li.style.opacity = 1;
    }, i * 900);
  });
}

function messWithNoButton() {
  // Random funny text
  const msg = noMessages[Math.floor(Math.random() * noMessages.length)];
  funnyText.textContent = msg;

  // Random movement
  const x = Math.random() * 200 - 100; // left-right
  const y = Math.random() * 120 - 60;  // up-down

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

/* Hover effect */
noBtn.addEventListener("mouseenter", messWithNoButton);
noBtn.addEventListener("click", messWithNoButton);





