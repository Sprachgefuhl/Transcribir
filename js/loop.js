let loopInterval;
let looping = false;

loopIconEl.addEventListener('click', () => {
  if (looping) return stopLoop();

  clearInterval(loopInterval);
  looping = true;

  const inputValues = document.querySelectorAll('.loop-input');

  const startLoopMins = parseInt(inputValues[0].value.split(':')[0]);
  const startLoopSecs = parseFloat(inputValues[0].value.split(':')[1]);
  const endLoopMins = parseInt(inputValues[1].value.split(':')[0]);
  const endLoopSecs = parseFloat(inputValues[1].value.split(':')[1]);

  const startLoop = formatMinsAndSecs(startLoopMins, startLoopSecs);
  const endLoop = formatMinsAndSecs(endLoopMins, endLoopSecs);

  if (startLoop >= endLoop) return;

  masterFile.currentTime = startLoop;

  loopInterval = setInterval(() => {
    if (masterFile.currentTime >= endLoop) masterFile.currentTime = startLoop;
  }, 10);

  loopIconEl.style.color = 'lightGreen';
});

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