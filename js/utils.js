const renderTimeDisplay = (time) => {
  timeCurrentEl.textContent = `${time.mins}:${formatTime(time.secs)}`;
  timeLeftEl.textContent = `${formatSeconds(masterDuration - Math.round(timeSliderEl.value)).mins}:${formatTime(formatSeconds(masterDuration - time.secs).secs)}`;
}

const displayFileName = (filename) => {
  document.getElementById('filename').innerText = filename;
}

const formatSeconds = (secs) => {
  let mins = 0;

  while (secs >= 60) {
    mins++;
    secs -= 60;
  }

  return {
    mins: mins,
    secs: secs
  }
}

const formatMinsAndSecs = (mins, secs) => {
  let newMins = parseFloat(mins);
  let newSecs = parseFloat(secs);

  while (newMins >= 1) {
    newSecs += 60;
    newMins--;
  }

  return newSecs;
}

const formatTime = (num) => {
  if (num < 10) {
    return '0' + num;
  } else {
    return num;
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const audioIsFinished = () => {
  if (Math.round(masterFile.currentTime) >= masterDuration) return true;
  else return false;
}

const txt = '¡Transcribir!';
let i = 0;

const typeWriter = () => {
  const speed = randomNumber(100, 150);
  if (i < txt.length) {
    titleEl.innerText += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

titleEl.innerHTML = '';
typeWriter();