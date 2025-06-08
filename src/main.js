import './style.css'
import './slotmachinestyle.scss'

const icon_width = 79;
const icon_height = 79;
const num_icons = 9;
const indexes = [0,0,0];

const roll = (reel, offset = 0) => {
  const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
  const style = getComputedStyle(reel);
  const time_per_icon = 100,
  backgroundPositionY = parseFloat(style['background-position-y']);

  return new Promise((resolve, reject) => {
    reel.style.transition = `background-position-y ${8  + delta * time_per_icon}ms`;
    reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;

    setTimeout(() => {
      resolve(delta)
    }, 8 + delta * time_per_icon)
  })
}

function rollAll() {
  const reels = document.querySelectorAll('.reel');
  [...reels].map((reel, index) => {
    console.log(reel,index);
    roll(reel, index).then((delta) => console.log(`Reel ${index} rolled by ${delta} icons`));   
  });
}

rollAll();