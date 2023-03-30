let loopInterval;
let looping = false;

loopIconEl.addEventListener('click', () => {
  if (looping) return stopLoop();

  clearInterval(loopInterval);
  looping = true;

  const inputValues = document.querySelectorAll('.loop-input');

  const startLoopMins = parseInt(inputValues[0].value.trim().split(':')[0]);
  const startLoopSecs = parseFloat(inputValues[0].value.trim().split(':')[1]);
  const endLoopMins = parseInt(inputValues[1].value.trim().split(':')[0]);
  const endLoopSecs = parseFloat(inputValues[1].value.trim().split(':')[1]);

  const startLoop = formatMinsAndSecs(startLoopMins, startLoopSecs);
  const endLoop = formatMinsAndSecs(endLoopMins, endLoopSecs);

  if (!areLoopInputsValid(startLoop, endLoop)) return;

  masterFile.currentTime = startLoop;

  loopInterval = setInterval(() => {
    if (masterFile.currentTime >= endLoop) masterFile.currentTime = startLoop;
  }, 10);

  loopIconEl.style.color = 'lightGreen';
});

const areLoopInputsValid = (startLoop, endLoop) => {
  if (startLoopInputEl.value === '' || endLoopInputEl.value === '') return false; // empty inputs
  if (startLoop >= endLoop) return false; // startLoop value higher than endLoop value
  if (startLoopInputEl.value.split('.').length == 2) {
    // no more than 2 decimal places for start loop input
    if (startLoopInputEl.value.trim().split('.')[1].length >= 3) return false;
  }

  if (endLoopInputEl.value.split('.').length == 2) {
    // no more than 2 decimal places for end loop input
    if (endLoopInputEl.value.trim().split('.')[1].length >= 3) return false;
  }

  return true;
}

const stopLoop = () => {
  if (looping) {
    clearInterval(loopInterval);
    looping = false;
    loopIconEl.style.color = '#fff';
  }
}

startLoopInputEl.addEventListener('input', () => {
  if (looping) stopLoop();
});

endLoopInputEl.addEventListener('input', () => {
  if (looping) stopLoop();
});