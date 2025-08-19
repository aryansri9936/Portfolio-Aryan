// Initialize Canvas - starfield and constellation
const starCanvas = document.getElementById('starfield');
const constellationCanvas = document.getElementById('constellation');

const ctxStar = starCanvas.getContext('2d');
const ctxConst = constellationCanvas.getContext('2d');

let stars = [];
const STAR_COUNT = 110;
let constellationLines = [];

function resizeCanvases() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
  constellationCanvas.width = window.innerWidth;
  constellationCanvas.height = window.innerHeight;
  generateStars();
  generateConstellation();
}
window.addEventListener('resize', resizeCanvases);
resizeCanvases();

// Generate stars with properties
function generateStars() {
  stars = [];
  for(let i=0; i<STAR_COUNT; i++){
    stars.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1 + Math.random() * 1.5,
      a: 0.6 + Math.random() * 0.4,
      tw: Math.random() * Math.PI * 2
    });
  }
}
// Animate starfield
function animateStars() {
  ctxStar.clearRect(0, 0, window.innerWidth, window.innerHeight);
  stars.forEach(s => {
    s.tw += 0.013 + Math.random() / 180;
    ctxStar.globalAlpha = s.a * (0.7 + 0.3 * Math.sin(s.tw));
    ctxStar.beginPath();
    ctxStar.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctxStar.fillStyle = '#fff';
    ctxStar.shadowColor = '#00f7ff';
    ctxStar.shadowBlur = 8 + s.r*2*(0.3 + Math.random());
    ctxStar.fill();
  });
  requestAnimationFrame(animateStars);
}

generateStars();
animateStars();

// Generate constellation lines between random points
function generateConstellation() {
  const points = [];
  const linesCount = Math.min(Math.max(Math.floor(STAR_COUNT / 1.6), 10), 50);
  for(let i=0; i<linesCount; i++) {
    points.push({x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight});
  }
  constellationLines = [];
  for(let i=0; i<Math.min(STAR_COUNT/4, 20); i++){
    const aIdx = Math.floor(Math.random()*points.length);
    const bIdx = Math.floor(Math.random()*points.length);
    if(aIdx !== bIdx) {
      constellationLines.push([points[aIdx], points[bIdx]]);
    }
  }
}
// Animate constellation lines
function animateConstellation() {
  ctxConst.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctxConst.globalAlpha = 0.18;
  ctxConst.strokeStyle = '#00defe';
  ctxConst.lineWidth=1;
  for(let [a, b] of constellationLines){
    ctxConst.beginPath();
    ctxConst.moveTo(a.x, a.y);
    ctxConst.lineTo(b.x, b.y);
    ctxConst.stroke();
  }
  requestAnimationFrame(animateConstellation);
}

generateConstellation();
animateConstellation();

// Scroll to About on indicator click
document.getElementById('scrollHint').addEventListener('click', ()=>{
  document.getElementById('about').scrollIntoView({behavior:'smooth'});
});

// Quiz logic
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

function loadQuiz() {
  const data = quizQuestions[qi];
  qEl.textContent = data.q;
  fbEl.textContent = '';
  fbEl.style.color = '';
  optsEl.innerHTML = '';
  data.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.onclick = ()=> checkAnswer(opt);
    optsEl.appendChild(btn);
  });
}
function checkAnswer(selected) {
  const correct = quizQuestions[qi].a;
  if(selected===correct){ 
    fbEl.textContent = '✅ Correct!'; 
    fbEl.style.color='lightgreen'; 
  }
  else { 
    fbEl.textContent = '❌ Oops! It was ' + correct; 
    fbEl.style.color='salmon'; 
  }
  setTimeout(()=>{
    qi++;
    if(qi<quizQuestions.length) loadQuiz();
    else {
      qEl.textContent = '🎉 You finished the quiz!';
      optsEl.innerHTML = '';
      fbEl.textContent = '';
    }
  },900);
}
loadQuiz();

// Easter egg: type "hero" to BOOM
let buffer=''; 
const boomContainer = document.getElementById('boom-container');
function spawnBoom() {
  const boom = document.createElement('div');
  boom.textContent='BOOM!';
  boom.style.position='fixed';
  boom.style.left= (Math.random()*70+10)+'vw';
  boom.style.top= (Math.random()*50+20)+'vh';
  boom.style.fontSize='clamp(2rem,8vw,6rem)';
  boom.style.fontWeight='900';
  boom.style.color='#ff3b8d';
  boom.style.textShadow='0 0 10px #fff,0 0 30px #ff3b8d';
  boom.style.transform='scale(.7) rotate(-6deg)';
  boom.style.transition='transform .6s ease, opacity .9s ease';
  boom.style.opacity='1';
  boom.style.pointerEvents='none';
  boomContainer.appendChild(boom);
  requestAnimationFrame(()=> boom.style.transform='scale(1.15) rotate(0deg)');
  setTimeout(()=> boom.style.opacity='0',700);
  setTimeout(()=> boom.remove(),1600);
}
window.addEventListener('keydown', (e)=>{
  buffer += e.key.toLowerCase();
  if(buffer.length>4) buffer=buffer.slice(-4);
  if(buffer==='hero'){ spawnBoom(); buffer=''; }
});

// Contact form submit alert
document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thanks! Your message has been launched through the portal. I will reply soon.');
  e.target.reset();
});
