let masterFile;
let masterFileName;
let masterDuration;
let audioPlaying = false;
let slidingTime = false;
speedSliderEl.disabled = true;
timeSliderEl.disabled = true;
startLoopInputEl.disabled = true;
endLoopInputEl.disabled = true;

const uploadFile = () => {
  let file = document.getElementById('file-upload').files[0];
  masterFileName = file.name;
  masterFile = new Audio(URL.createObjectURL(file));

  masterFile.addEventListener('canplaythrough', () => {
    speedSliderEl.disabled = false;
    timeSliderEl.disabled = false;
    startLoopInputEl.disabled = false;
    endLoopInputEl.disabled = false;

    timeSliderEl.max = Math.round(masterFile.duration);
    masterDuration = Math.round(masterFile.duration);

    document.getElementById('file').style.color = 'lightGreen';
    displayFileName(masterFileName);
  });

  masterFile.currentTime = 0;
  timeSliderEl.value = 0;

  setInterval(() => {
    updateTime();
  }, 10);
  playFile();
}

const playFile = () => {
  masterFile.currentTime = timeSliderEl.value;
  masterFile.play();
  audioPlaying = true;
  playPauseEl.className = 'fa-solid fa-pause control';
}

const pauseFile = () => {
  masterFile.pause();
  audioPlaying = false;
  playPauseEl.className = 'fa-solid fa-play control';
}

const updateTime = () => {
  if (slidingTime) return;

  if (audioIsFinished()) {
    masterFile.currentTime = 0;
    pauseFile();
  }

  const time = formatSeconds(Math.round(masterFile.currentTime));
  timeSliderEl.value = masterFile.currentTime;
  renderTimeDisplay(time);
}

document.getElementById('file-upload').addEventListener('change', () => {
  if (masterFile) {
    masterFile.pause();
    masterFile.currentTime = 0;
  }

  uploadFile();
});

playPauseEl.addEventListener('click', () => {
  if (audioPlaying) pauseFile();
  else playFile();
});

speedSliderEl.addEventListener('input', () => {
  masterFile.playbackRate = speedSliderEl.value / 100;
  document.getElementById('speed-display').textContent = speedSliderEl.value + '%';
});

timeSliderEl.addEventListener('mousedown', () => slidingTime = true);

timeSliderEl.addEventListener('input', () => {
  const time = formatSeconds(Math.round(timeSliderEl.value));
  stopLoop();
  renderTimeDisplay(time);
});

timeSliderEl.addEventListener('mouseup', () => {
  slidingTime = false;
  masterFile.currentTime = timeSliderEl.value;
});