const icon_width = 79;
const icon_height = 79;
const num_icons = 9;
let rolling = [false, false, false];
let speed = 100;

function getSpeedSetting() {
  const input = document.getElementById('speed');
  input.addEventListener('change', () => {
    speed = parseInt(input.value);
    localStorage.setItem('rollingSpeed', speed);
  });
  const stored = localStorage.getItem('rollingSpeed');
  if (stored) {
    input.value = stored;
    speed = parseInt(stored);
  }
}

const roll = (reel, offset = 0, index) => {
  const delta = 1;//(offset + 2) * num_icons + Math.round(Math.random() * num_icons);
  const style = getComputedStyle(reel);
  const backgroundPositionY = parseFloat(style['background-position-y']) || 0;

  return new Promise((resolve) => {
    const duration = 8 + delta * speed;
    reel.style.transition = `background-position-y ${duration}ms linear`;
    reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
    setTimeout(() => resolve(delta), duration);
  });
};

function rollAll() {
  const reels = document.querySelectorAll('.reel');
  reels.forEach((reel, i) => {
    rolling[i] = true;
    rollLoop(reel, i);
  });
}

function rollLoop(reel, index) {
  if (!rolling[index]) return;
  roll(reel, index, index).then(() => {
    if (rolling[index]) rollLoop(reel, index);
  });
}

function stop(index) {
  rolling[index] = false;
}

document.getElementById('start').addEventListener('click', rollAll);
document.getElementById('stop0').addEventListener('click', () => stop(0));
document.getElementById('stop1').addEventListener('click', () => stop(1));
document.getElementById('stop2').addEventListener('click', () => stop(2));

getSpeedSetting();
