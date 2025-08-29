
let xp = 0;
let beltIndex = 0;

const belts = [
  {
    name: "White",
    xpMax: 500,
    lesson: "Learn basic Korean terms (e.g., Charyot, Kyungnae) and Taekwondo etiquette.",
    dailies: [
      "🦵 Front kick (10x each leg)",
      "👊 Jab punch (10x)",
      "🧘‍♂️ 3 min stretching"
    ]
  },
  {
    name: "Yellow",
    xpMax: 1200,
    lesson: "Practice stance transitions and basic blocks. Review Korean counting (Hana, Dul, Set...).",
    dailies: [
      "🦵 Side kick (10x each leg)",
      "🛡️ Low block (10x)",
      "🧘‍♂️ 5 min stretching"
    ]
  },
  {
    name: "Green",
    xpMax: 2500,
    lesson: "Learn intermediate kicks and self-defense techniques.",
    dailies: [
      "🦵 Roundhouse kick (10x each leg)",
      "🛡️ Middle block (10x)",
      "🧘‍♂️ 7 min stretching"
    ]
  },
  {
    name: "Blue",
    xpMax: 4000,
    lesson: "Practice advanced combinations and sparring drills.",
    dailies: [
      "🦵 Back kick (10x each leg)",
      "🎯 Combo drill challenge",
      "🧘‍♂️ 10 min stretching"
    ]
  },
  {
    name: "Red",
    xpMax: 6000,
    lesson: "Focus on breaking techniques and advanced forms.",
    dailies: [
      "🦵 Jump kick (10x each leg)",
      "🛡️ High block (10x)",
      "🧘‍♂️ 12 min stretching"
    ]
  },
  {
    name: "Brown",
    xpMax: 10000,
    lesson: "Refine all techniques and prepare for black belt test.",
    dailies: [
      "🦵 Spinning kick (10x each leg)",
      "🎯 Advanced combo drill",
      "🧘‍♂️ 15 min stretching"
    ]
  },
  {
    name: "Black",
    xpMax: 15000,
    lesson: "Mastery: Teach others, create your own combinations, and continue lifelong learning.",
    dailies: [
      "🦵 Creative kick (10x each leg)",
      "🎯 Create a new drill",
      "🧘‍♂️ 20 min stretching"
    ]
  }
];

function updateUI() {
  const belt = belts[beltIndex];
  document.getElementById("belt").textContent = belt.name;
  document.getElementById("xp").textContent = xp;
  document.getElementById("xpMax").textContent = belt.xpMax;
  document.getElementById("xpBar").style.width = `${(xp / belt.xpMax) * 100}%`;
  // Update lesson text
  document.getElementById("lessonText").textContent = belt.lesson;
  // Reload tasks for current belt
  loadTasks();
}

function completeLesson() {
  xp += 100;
  showConfetti();
  checkLevelUp();
  updateUI();
}

function completeTask() {
  xp += 50;
  showConfetti();
  // Play success chime
  const sound = document.getElementById('completeSound');
  if (sound) sound.play();
  checkLevelUp();
  updateUI();
}

function checkLevelUp() {
  const belt = belts[beltIndex];
  if (xp >= belt.xpMax && beltIndex < belts.length - 1) {
    beltIndex++;
    xp = 0;
    alert(`🎉 You've leveled up to ${belts[beltIndex].name} Belt!`);
  }
}

function loadTasks() {
  const belt = belts[beltIndex];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  belt.dailies.forEach(task => {
    const li = document.createElement("li");
    li.className = "bg-gray-700 p-2 rounded flex justify-between items-center";
    li.innerHTML = `<span>${task}</span><button class=\"bg-blue-500 px-2 py-1 rounded text-sm\" onclick=\"completeTask()\">Complete</button>`;
    taskList.appendChild(li);
  });
}


// Confetti effect
function showConfetti() {
  const confettiContainer = document.createElement('div');
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.left = 0;
  confettiContainer.style.top = 0;
  confettiContainer.style.width = '100vw';
  confettiContainer.style.height = '100vh';
  confettiContainer.style.pointerEvents = 'none';
  confettiContainer.style.zIndex = 9999;
  document.body.appendChild(confettiContainer);

  const colors = ['#FFD700', '#FF69B4', '#00BFFF', '#32CD32', '#FF4500', '#8A2BE2'];
  const numParticles = 40;
  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.borderRadius = '50%';
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = '-20px';
    particle.style.opacity = 0.8;
    particle.style.transition = 'transform 1.2s cubic-bezier(.62,.28,.23,.99), opacity 1.2s';
    confettiContainer.appendChild(particle);
    setTimeout(() => {
      particle.style.transform = `translateY(${window.innerHeight * 0.8 + Math.random() * 100}px) rotate(${Math.random() * 360}deg)`;
      particle.style.opacity = 0;
    }, 50);
  }
  setTimeout(() => {
    confettiContainer.remove();
  }, 1400);
}

// Initial load
updateUI();
