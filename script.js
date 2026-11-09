/* ================= CONFIG — EDIT THESE ================= */
const CONFIG = {
  herName: "Krizel Asim bebe",   // ✏️ her name (also edit it in index.html)
  month: 10,                // ✏️ birthday month, 0-based: Jan=0 ... Nov=10, Dec=11
  day: 10                   // ✏️ birthday day
};

// ✏️ PHOTOS: replace `src` with your image path, e.g. "photos/first-date.jpg".
// Leave src empty ("") to show a pink placeholder.
const PHOTOS = [
  { src: "1.jpg", alt: "Photo of us on our second date", caption: "Our second date (kasi walang pic nung first)" },
  { src: "2.jpg", alt: "Her smiling", caption: "Your sweet smile is my favorite view." },
  { src: "3.jpg", alt: "Us together", caption: "Every moment with you feels like a good memory." },
  { src: "4.jpg", alt: "An ordinary day together", caption: "You make ordinary days feel special." },
  { src: "5.jpg", alt: "A silly moment together", caption: "My favorite kind of chaos." },
  { src: "6.jpg", alt: "Us surrounded by pink", caption: "You + me + pink everything." },
  { src: "7.jpg", alt: "Her happy face", caption: "The girl who makes my heart happy." },
  { src: "8.jpg", alt: "A favorite moment", caption: "I’d choose this moment with you every time bcoz tteokbokki is so good" },
  { src: "9.jpg", alt: "Goofy side", caption: "Your goofy side is my favorite." },
  { src: "10.jpg", alt: "A bright, sweet day", caption: "You make life softer, brighter, and sweeter." },
  { src: "11.jpg", alt: "Us side by side", caption: "Still my favorite place to be. next to you." },
  { src: "12.jpg", alt: "Birthday photo", caption: "Happy birthday to the girl who owns my heart." }
];

// ✏️ REASONS (front shows 💗, back shows the text)
const REASONS = ["Your sweet smile", "Your kindness", "The way you care", "Your energy", "Lastly, your love for me shrimpi"];

/* ================= HELPERS ================= */
const $ = id => document.getElementById(id);
const goTo = id => $(id).scrollIntoView({ behavior: "smooth" });

/* ================= FLOATING DECOR ================= */
const colors = ["#FF4D94", "#FFC2D4", "#D6336C", "#C9A7EB"];
function floater() {
  const box = $("floaters"), el = document.createElement("div");
  const r = Math.random(), dur = 8 + Math.random() * 8;
  el.className = "fl";
  el.style.left = Math.random() * 100 + "%";
  el.style.animationDuration = dur + "s";
  if (r < .55) { el.textContent = "💗"; el.style.fontSize = 16 + Math.random() * 22 + "px"; }
  else if (r < .8) { el.textContent = "✨"; el.style.fontSize = 14 + Math.random() * 14 + "px"; }
  else { const b = document.createElement("div"); b.className = "balloon";
    b.style.background = colors[Math.floor(Math.random() * 4)]; el.appendChild(b); }
  box.appendChild(el);
  setTimeout(() => el.remove(), dur * 1000);
}
setInterval(floater, 650);

/* ================= CONFETTI ================= */
const cv = $("confetti"), ctx = cv.getContext("2d"); let bits = [], raf;
function sizeCanvas() { cv.width = innerWidth; cv.height = innerHeight; }
addEventListener("resize", sizeCanvas); sizeCanvas();
function confetti(n = 140) {
  for (let i = 0; i < n; i++) bits.push({
    x: Math.random() * cv.width, y: -20 - Math.random() * cv.height * .4,
    w: 6 + Math.random() * 6, h: 8 + Math.random() * 8, vy: 2 + Math.random() * 4,
    vx: -1.5 + Math.random() * 3, rot: Math.random() * 6, vr: -.2 + Math.random() * .4,
    c: colors[Math.floor(Math.random() * 4)]
  });
  if (!raf) loop();
}
function loop() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  bits.forEach(b => { b.x += b.vx; b.y += b.vy; b.rot += b.vr;
    ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.rot); ctx.fillStyle = b.c;
    ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); ctx.restore(); });
  bits = bits.filter(b => b.y < cv.height + 30);
  raf = bits.length ? requestAnimationFrame(loop) : (ctx.clearRect(0, 0, cv.width, cv.height), null);
}

/* ================= START ================= */
$("openBtn").addEventListener("click", () => {
  $("experience").hidden = false;
  confetti(80);
  setTimeout(() => goTo("countdown"), 50);
});

/* ================= COUNTDOWN ================= */
function targetDate() {
  const now = new Date();
  let t = new Date(now.getFullYear(), CONFIG.month, CONFIG.day, 0, 0, 0);
  const sameDay = now.getMonth() === CONFIG.month && now.getDate() === CONFIG.day;
  if (!sameDay && t < now) t = new Date(now.getFullYear() + 1, CONFIG.month, CONFIG.day, 0, 0, 0);
  return { t, sameDay };
}
let celebrated = false;
function tick() {
  const { t, sameDay } = targetDate();
  if (sameDay) {
    $("timer").hidden = true; $("special").hidden = false;
    if (!celebrated) { celebrated = true; confetti(200); setInterval(() => confetti(40), 4000); }
    return;
  }
  let s = Math.max(0, Math.floor((t - new Date()) / 1000));
  $("d").textContent = Math.floor(s / 86400);
  $("h").textContent = Math.floor(s % 86400 / 3600);
  $("m").textContent = Math.floor(s % 3600 / 60);
  $("s").textContent = s % 60;
}
tick(); setInterval(tick, 1000);

/* ================= LETTER ================= */
$("letterBtn").addEventListener("click", e => {
  const open = $("letterCard").classList.toggle("open");
  e.target.setAttribute("aria-expanded", open);
  e.target.textContent = open ? "Close My Letter" : "Read My Letter";
});

/* ================= GALLERY + LIGHTBOX ================= */
function placeholder(i) {
  const hue = ["#FFC2D4", "#C9A7EB", "#FF4D94", "#FFF0F5"][i % 4];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='400' height='400' fill='${hue}'/><text x='200' y='235' font-size='110' text-anchor='middle'>💗</text></svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
PHOTOS.forEach((p, i) => {
  const b = document.createElement("button");
  b.className = "photo"; b.type = "button";
  const src = p.src || placeholder(i);
  b.innerHTML = `<img src="${src}" alt="${p.alt}" loading="lazy"><p>${p.caption}</p>`;
  b.addEventListener("click", () => {
    $("lbImg").src = src; $("lbImg").alt = p.alt; $("lbCap").textContent = p.caption;
    $("lightbox").hidden = false; $("lbClose").focus();
  });
  $("gallery").appendChild(b);
});
const closeLb = () => { $("lightbox").hidden = true; };
$("lbClose").addEventListener("click", closeLb);
$("lightbox").addEventListener("click", e => { if (e.target.id === "lightbox") closeLb(); });
addEventListener("keydown", e => { if (e.key === "Escape") closeLb(); });

/* ================= REASONS (FLIP CARDS) ================= */
REASONS.forEach(r => {
  const c = document.createElement("button");
  c.className = "flip"; c.type = "button"; c.setAttribute("aria-label", "Reveal a reason I love you");
  c.innerHTML = `<div class="inner"><div class="face front">💗</div><div class="face back">${r}</div></div>`;
  c.addEventListener("click", () => c.classList.toggle("on"));
  $("reasonGrid").appendChild(c);
});

/* ================= CAKE ================= */
$("wishBtn").addEventListener("click", e => {
  document.querySelector(".cake").classList.add("out");
  confetti(180);
  $("wishMsg").hidden = false;
  e.target.disabled = true; e.target.textContent = "Wish made 💫";
  setTimeout(() => goTo("final"), 3500);
});

/* ================= FINAL ================= */
$("moreBtn").addEventListener("click", () => {
  $("finalNote").hidden = false; confetti(220);
  $("finalNote").scrollIntoView({ behavior: "smooth", block: "center" });
});