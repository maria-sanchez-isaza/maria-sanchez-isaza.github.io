const modelViewer = document.querySelector('#wingChunModel');
const timeline = document.querySelector('#timeline');
const playButton = document.querySelector('#playButton');
const previousButton = document.querySelector('#previousButton');
const nextButton = document.querySelector('#nextButton');
const currentTimeLabel = document.querySelector('#currentTime');
const durationLabel = document.querySelector('#duration');
const movementNumber = document.querySelector('#movementNumber');
const movementName = document.querySelector('#movementName');
const movementDescription = document.querySelector('#movementDescription');
const movementButtons = document.querySelector('#movementButtons');

// DEMO DATA ONLY. The complete animation is approximately 1:55.
// Replace these estimated timestamps, names, and descriptions when Bradley
// provides the final movement breakdown. Times are measured in seconds.
const movements = [
  {
    start: 0,
    name: 'Opening Stance',
    description: 'Begin in a balanced stance and prepare to start the form.'
  },
  {
    start: 8,
    name: 'Crossed Hands',
    description: 'Bring the arms across the centerline to establish the opening position.'
  },
  {
    start: 17,
    name: 'Tan Sau',
    description: 'Extend the palm upward while keeping the elbow relaxed and centered.'
  },
  {
    start: 27,
    name: 'Wu Sau',
    description: 'Return the guarding hand toward the center of the body.'
  },
  {
    start: 36,
    name: 'Fook Sau',
    description: 'Guide the hand inward with a relaxed wrist and controlled elbow.'
  },
  {
    start: 46,
    name: 'Huen Sau',
    description: 'Circle the wrist smoothly while maintaining control of the centerline.'
  },
  {
    start: 56,
    name: 'Pak Sau',
    description: 'Use a short, direct palm movement across the centerline.'
  },
  {
    start: 66,
    name: 'Bong Sau',
    description: 'Lift and rotate the forearm while keeping the shoulder relaxed.'
  },
  {
    start: 76,
    name: 'Gum Sau',
    description: 'Press the palm downward with a controlled and grounded motion.'
  },
  {
    start: 86,
    name: 'Lan Sau',
    description: 'Position the forearm horizontally across the body with steady structure.'
  },
  {
    start: 96,
    name: 'Double Tan Sau',
    description: 'Extend both palms upward while maintaining symmetry and balance.'
  },
  {
    start: 106,
    name: 'Closing Salutation',
    description: 'Bring the sequence to a controlled close and return to the starting position.'
  }
];

let activeMovementIndex = 0;
let isScrubbing = false;
let animationFrameId = null;

function formatTime(seconds) {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, seconds) : 0;
  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = Math.floor(safeSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${remainingSeconds}`;
}

function getMovementIndex(time) {
  let index = 0;
  for (let i = 0; i < movements.length; i += 1) {
    if (time >= movements[i].start) index = i;
  }
  return index;
}

function renderMovement(index) {
  activeMovementIndex = Math.max(0, Math.min(index, movements.length - 1));
  const movement = movements[activeMovementIndex];
  movementNumber.textContent = `Movement ${activeMovementIndex + 1} of ${movements.length}`;
  movementName.textContent = movement.name;
  movementDescription.textContent = movement.description;

  document.querySelectorAll('.movement-jump').forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === activeMovementIndex);
    button.setAttribute('aria-current', buttonIndex === activeMovementIndex ? 'true' : 'false');
  });
}

function renderMovementButtons() {
  movementButtons.innerHTML = '';
  movements.forEach((movement, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'movement-jump';
    button.innerHTML = `<strong>${movement.name}</strong><span>Starts at ${formatTime(movement.start)}</span>`;
    button.addEventListener('click', () => jumpToMovement(index));
    movementButtons.appendChild(button);
  });
  renderMovement(0);
}

function updateInterface() {
  if (!isScrubbing) {
    const time = Number(modelViewer.currentTime) || 0;
    timeline.value = time;
    currentTimeLabel.textContent = formatTime(time);
    const nextMovementIndex = getMovementIndex(time);
    if (nextMovementIndex !== activeMovementIndex) renderMovement(nextMovementIndex);
  }
  animationFrameId = requestAnimationFrame(updateInterface);
}

function jumpToMovement(index) {
  const movement = movements[index];
  if (!movement) return;
  modelViewer.currentTime = movement.start;
  timeline.value = movement.start;
  currentTimeLabel.textContent = formatTime(movement.start);
  renderMovement(index);
}

function updatePlayButton() {
  playButton.textContent = modelViewer.paused ? 'Play' : 'Pause';
}

modelViewer.addEventListener('load', () => {
  const actualDuration = Number(modelViewer.duration);
  if (Number.isFinite(actualDuration) && actualDuration > 0) {
    timeline.max = actualDuration;
    durationLabel.textContent = formatTime(actualDuration);
  } else {
    timeline.max = 115;
    durationLabel.textContent = '1:55';
  }

  modelViewer.currentTime = 0;
  updatePlayButton();

  if (!animationFrameId) updateInterface();
});

modelViewer.addEventListener('play', updatePlayButton);
modelViewer.addEventListener('pause', updatePlayButton);

playButton.addEventListener('click', () => {
  if (modelViewer.paused) modelViewer.play();
  else modelViewer.pause();
  updatePlayButton();
});

previousButton.addEventListener('click', () => {
  jumpToMovement(Math.max(0, activeMovementIndex - 1));
});

nextButton.addEventListener('click', () => {
  jumpToMovement(Math.min(movements.length - 1, activeMovementIndex + 1));
});

timeline.addEventListener('pointerdown', () => { isScrubbing = true; });
timeline.addEventListener('pointerup', () => { isScrubbing = false; });
timeline.addEventListener('change', () => { isScrubbing = false; });

timeline.addEventListener('input', () => {
  const selectedTime = Number(timeline.value);
  modelViewer.currentTime = selectedTime;
  currentTimeLabel.textContent = formatTime(selectedTime);
  renderMovement(getMovementIndex(selectedTime));
});

renderMovementButtons();
