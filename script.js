/* ====== EDIT THIS SECTION ====== */
const birthdayName = "Geous";
const yourName = "Beaulah";
const correctAnswer = "Football Ground";
const otherAcceptedAnswers = ["football", "the football ground", "ground"]; // also accepted
const question = "Where did we first meet? 💭";
const welcomeMessage = `Today is all about you, ${birthdayName}! 🎂✨ Thank you for being the softest, kindest soul in my life. I made this little world just for you. Come, let's walk through our memories 💖`;
const photos = [
  { file: "photo1.jpg", caption: "My sleepy baby 😴💤" },
  { file: "photo2.jpg", caption: "Us, being us 🥰" },
  { file: "photo3.jpg", caption: "Stolen selfie moment 🌳💕" },
  { file: "photo4.jpg", caption: "That little boy smile 🥹" }
];
const finalPhotoFile = "photo2.jpg"; // photo shown on the last page
const letterText = `To my dearest ${birthdayName}-க்கு, 📜

Dear ${birthdayName}✨, I pen these words with a full heart on this special day. 🕯️

 ✨

Some people become beautiful memories,
some become beautiful chapters,
and some simply become a quiet part of your story. 🌙

Even with miles between us,
distance has never made the moments we shared feel any less real. 🌍✨
Sometimes, it is strange how someone can be far away
and still leave little traces of themselves in ordinary days.

I hope this new year of your life brings you
peaceful mornings, unexpected happiness,
meaningful moments, and dreams that slowly turn into reality. 🌿☀️

May you always find reasons to smile,
people who genuinely value you,
and places where you feel exactly where you belong. 🤍

Wherever life takes you from here,
I hope you keep becoming the person
you are meant to be. ✨

And maybe, somewhere between all the miles,
memories, and passing days,
this little birthday wish finds its way to you. 🌙💫

Happy Birthday, Geous. 🎂✨
May this year be gentle with you
and full of beautiful surprises. 🤍
By your's
${yourName} 💖`;
const surpriseMessage = `Sending you the biggest hug 🤗💖 Happy Birthday, my ${birthdayName}! 🫂❤️`;
const finalMessage = `And here we are… at the last page. ✨

Maybe this little website is just a collection of words,
pictures, and a few hidden surprises.
But somewhere between these pages,
I hope you found a reason to smile. 🌙

Life has a funny way of placing people
in different places, on different roads,
under completely different skies. 🌍

And even if our paths are miles apart,
some moments don't really need distance to disappear.
They simply become part of the story. ✨

So, Geous…
don't just count another year today.
Count the little moments that made you laugh,
the people who made ordinary days brighter,
the dreams that are still waiting for you,
and all the beautiful chapters yet to come. 🌿

May this year surprise you in the best ways.
May you find happiness in unexpected places,
courage when you need it,
and countless reasons to look back and smile. ☀️

And when this page closes…
your next chapter begins. 📖✨

Happy Birthday, Geous. 🎂🤍
Here's to the story you haven't written yet. 🌙`;
const closingMessage = `Forever yours, ${yourName} 💌`;
/* Song on the last page: put the mp3 in the music folder */
const songFile = "music/perfect.mp3";
const songStart = 15;   // second where the "I found a love" line begins - change after testing
const songSeconds = 30; // how long it plays
/* ====== END OF EDIT SECTION ====== */

const $ = id => document.getElementById(id);
const page = document.body.dataset.page;
document.querySelectorAll(".name").forEach(e => e.textContent = birthdayName);

function floatStuff(emojis, every) {
  setInterval(() => {
    const s = document.createElement("span");
    s.className = "fly";
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = Math.random() * 95 + "vw";
    s.style.fontSize = 16 + Math.random() * 24 + "px";
    s.style.animationDuration = 6 + Math.random() * 6 + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 12500);
  }, every);
}

function confetti(count = 90) {
  const colors = ["#ff8fb1", "#b69cff", "#8fd3ff", "#ffd36e", "#8fe3b5"];
  for (let i = 0; i < count; i++) {
    const c = document.createElement("div");
    c.className = "conf";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = 2.5 + Math.random() * 3 + "s";
    c.style.animationDelay = Math.random() * 1.2 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 7500);
  }
}

if (page === "index") {
  sessionStorage.removeItem("unlocked"); // replay starts the journey fresh
  floatStuff(["✨", "🎈", "💖", "⭐", "🎀"], 500);
}

if (page === "welcome") {
  $("welcomeMsg").textContent = welcomeMessage;
  confetti(); setTimeout(confetti, 3000);
  floatStuff(["🎈", "🎉", "💖"], 700);
  $("cake").onclick = () => confetti();
}

if (page === "memories") {
  photos.forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "photo";
    d.style.animationDelay = i * 0.2 + "s";
    d.innerHTML = `<div class="pic"><img src="images/${p.file}" alt="${p.caption}"></div><span>${p.caption}</span>`;
    d.querySelector("img").onerror = () => d.classList.add("noimg");
    $("gallery").appendChild(d);
  });
}

if (page === "letter") {
  let i = 0;
  const box = $("letterText");
  box.onclick = () => { i = letterText.length; }; // tap to show full letter
  (function type() {
    if (i <= letterText.length) { box.textContent = letterText.slice(0, i++); setTimeout(type, 25); }
  })();
}

if (page === "surprise") {
  $("openBtn").onclick = () => {
    $("gift").classList.add("open");
    $("openBtn").classList.add("hidden");
    setTimeout(() => {
      $("reveal").textContent = surpriseMessage;
      $("reveal").classList.remove("hidden");
      $("reveal").classList.add("pop");
      $("nextBtn").classList.remove("hidden");
      confetti();
    }, 900);
  };
}

if (page === "question") {
  $("questionText").textContent = question;
  const check = () => {
    const norm = t => t.trim().toLowerCase().replace(/\s+/g, " ");
    const guess = norm($("answer").value);
    if ([correctAnswer, ...otherAcceptedAnswers].some(a => norm(a) === guess)) {
      sessionStorage.setItem("unlocked", "yes");
      $("feedback").textContent = "Yes!! That's it! 🥹💖";
      $("feedback").classList.add("pop");
      $("checkBtn").classList.add("hidden");
      $("goFinal").classList.remove("hidden");
      confetti();
    } else {
      $("feedback").textContent = "Hmm... that's not it 😌 Try again!";
      $("answer").classList.remove("shake");
      void $("answer").offsetWidth;
      $("answer").classList.add("shake");
    }
  };
  $("checkBtn").onclick = check;
  $("answer").addEventListener("keydown", e => { if (e.key === "Enter") check(); });
}

if (page === "final") {
  if (sessionStorage.getItem("unlocked") !== "yes") {
    window.location.replace("question.html"); // must answer the question first
  }
  $("finalMsg").textContent = finalMessage;
  $("closing").textContent = closingMessage;
  const img = $("finalPhoto");
  img.src = "images/" + finalPhotoFile;
  img.onerror = () => img.classList.add("hidden");
  confetti(120); setInterval(() => confetti(40), 6000);
  floatStuff(["💖", "✨", "⭐", "💕", "🎉"], 350);
  $("playSong").onclick = startSong;
  startSong();
}

function startSong() {
  const a = $("song");
  if (!a.src) a.src = songFile;
  a.onerror = () => $("playSong").classList.add("hidden");
  const go = () => {
    a.currentTime = songStart; a.volume = 1;
    a.play().then(() => {
      $("playSong").classList.add("hidden");
      setTimeout(() => {
        const f = setInterval(() => {
          a.volume = Math.max(0, a.volume - 0.1);
          if (a.volume <= 0) { a.pause(); clearInterval(f); }
        }, 300);
      }, (songSeconds - 3) * 1000);
    }).catch(() => $("playSong").classList.remove("hidden"));
  };
  a.readyState >= 1 ? go() : a.addEventListener("loadedmetadata", go, { once: true });
}
