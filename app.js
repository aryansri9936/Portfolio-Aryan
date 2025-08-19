// STARFIELD + CONSTELLATION
const STAR_COUNT = 110;
const CONSTELLATION_LINES = 20;

function drawStarfield() {
  const canvas = document.getElementById('starfield');
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  // Star positions and opacities
  const stars = [];
  for (let i=0; i<STAR_COUNT; i++) {
    stars.push({
      x: Math.random()*w,
      y: Math.random()*h,
      r: 1+Math.random()*1.6,
      a: 0.7+Math.random()*0.3,
      tw: Math.random() * Math.PI * 2
    });
  }
  function animate() {
    ctx.clearRect(0,0,w,h);
    for (let i=0; i<STAR_COUNT; i++) {
      let s = stars[i];
      s.tw += 0.013+Math.random()/180;
      ctx.globalAlpha = s.a * (0.7+0.3*Math.sin(s.tw));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, 2*Math.PI);
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "#00f7ff";
      ctx.shadowBlur = 8+s.r*2*(0.3+Math.random());
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    requestAnimationFrame(animate);
  }
  animate();
}
drawStarfield();
window.addEventListener('resize', drawStarfield);

// Draw minimalistic constellation lines between random stars
function drawConstellation() {
  const canvas = document.getElementById('constellation');
  let w = window.innerWidth, h = window.innerHeight;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  // Randomly generate constellation points for each load/resize
  const points = [];
  for (let i = 0; i < STAR_COUNT/1.6; i++) {
    points.push({x: Math.random()*w, y: Math.random()*h});
  }
  const pairs = [];
  for (let i = 0; i < CONSTELLATION_LINES; i++) {
    let a = Math.floor(Math.random()*points.length);
    let b = Math.floor(Math.random()*points.length);
    if (a!==b) pairs.push([points[a], points[b]]);
  }
  function animate() {
    ctx.clearRect(0,0,w,h);
    ctx.globalAlpha = 0.18;
    ctx.strokeStyle = "#00defe";
    ctx.lineWidth = 1;
    for (let [a,b] of pairs) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }
  animate();
}
drawConstellation();
window.addEventListener('resize', drawConstellation);

// Scroll-to-About
document.getElementById('scrollHint').addEventListener('click', ()=>{
  document.getElementById('about').scrollIntoView({behavior:'smooth'});
});

// Quiz logic (same as before)
const quizQuestions = [
  { q:"Which movie genre inspires Aryan?", options:["Romance","Action","Comedy","Horror"], a:"Action" },
  { q:"What was Aryan’s first creative website?", options:["Portfolio","Superhero Resume","Blog","Quiz App"], a:"Superhero Resume" },
  { q:"Aryan is passionate about?", options:["Cooking","Fashion","Sports","Music"], a:"Fashion" },
  { q:"Where did Aryan complete Full-Stack training?", options:["IIT Delhi","Masai School","NIT Warangal","IIIT Allahabad"], a:"Masai School" },
];
let qi=0;
const qEl = document.getElementById('quiz-question');
const optsEl = document.getElementById('quiz-options');
const fbEl = document.getElementById('quiz-feedback');

function loadQ(){
  const data = quizQuestions[qi];
  qEl.textContent = data.q;
  fbEl.textContent = '';
  optsEl.innerHTML = '';
  data.options.forEach(opt=>{
    const b = document.createElement('button');
    b.textContent = opt;
    b.onclick = ()=> check(opt);
    optsEl.appendChild(b);
  });
}
function check(sel){
  const correct = quizQuestions[qi].a;
  if(sel===correct){ fbEl.textContent = '✅ Correct!'; fbEl.style.color='lightgreen'; }
  else{ fbEl.textContent = '❌ Oops! It was ' + correct; fbEl.style.color='salmon'; }
  setTimeout(()=>{
    qi++;
    if(qi<quizQuestions.length) loadQ();
    else{
      qEl.textContent = '🎉 You finished the quiz!';
      optsEl.innerHTML = '';
      fbEl.textContent = '';
    }
  },900);
}
loadQ();

// Easter egg: type 'hero' to BOOM
let buffer = '';
const boomContainer = document.getElementById('boom-container');
function spawnBoom(){
  const boom = document.createElement('div');
  boom.textContent = 'BOOM!';
  boom.style.position = 'fixed';
  boom.style.left = (Math.random()*70+10) + 'vw';
  boom.style.top  = (Math.random()*50+20) + 'vh';
  boom.style.fontSize = 'clamp(2rem, 8vw, 6rem)';
  boom.style.fontWeight = '900';
  boom.style.color = '#ff3b8d';
  boom.style.textShadow = '0 0 10px #fff, 0 0 30px #ff3b8d';
  boom.style.transform = 'scale(.7) rotate(-6deg)';
  boom.style.transition = 'transform .6s ease, opacity .9s ease';
  boom.style.opacity = '1';
  boom.style.pointerEvents = 'none';
  boomContainer.appendChild(boom);
  requestAnimationFrame(()=> boom.style.transform = 'scale(1.15) rotate(0deg)');
  setTimeout(()=> boom.style.opacity = '0', 700);
  setTimeout(()=> boom.remove(), 1600);
}
window.addEventListener('keydown', (e)=>{
  buffer += e.key.toLowerCase();
  if(buffer.length>4) buffer = buffer.slice(-4);
  if(buffer === 'hero'){ spawnBoom(); buffer=''; }
});

// Contact form (demo)
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thanks! Your message has been launched through the portal. I will reply soon.');
  e.target.reset();
});
