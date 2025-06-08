import './style.css'
import './slotmachinestyle.scss'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

`document.querySelector('#app').innerHTML = 
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
  setupCounter(document.querySelector('#counter'))
`

const icon_width = 79;
const icon_height = 79;
const num_icons = 9;
const indexes = [0,0,0];

const roll = (reel, offset = 0) => {
  const delta = (offset + 2) * num_icons + Math.round(Math.random() * num_icons);
  const style = getComputedStyle(reel);
  const time_per_icon = 100,
  backgroundPositionY = parseFloat(style['background-position-y']);

  reel.style.transition = `background-position-y ${8  + delta * time_per_icon}ms`;
  reel.style.backgroundPositionY = `${backgroundPositionY + delta * icon_height}px`;
}

function rollAll() {
  const reels = document.querySelectorAll('.reel');
  [...reels].map((reel, index) => {
    console.log(reel,index);
    roll(reel, index);
  });
}

rollAll();