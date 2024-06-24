document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audio");
  const playButton = document.getElementById("play");
  const stopButton = document.getElementById("stop");
  const forwardButton = document.getElementById("forward");
  const backwardButton = document.getElementById("backward");
  const seekBar = document.getElementById("seek");
  const currentTimeLabel = document.getElementById("current-time");
  const totalTimeLabel = document.getElementById("total-time");
  let status = 0;

  // Update the seek bar as the audio plays
  audio.addEventListener("timeupdate", function () {
    seekBar.value = audio.currentTime;
    updateTimeLabels();
  });

  // Set the total duration when metadata is loaded
  audio.addEventListener("loadedmetadata", function () {
    seekBar.max = audio.duration;
    updateTimeLabels();
  });

  // Seek audio
  seekBar.addEventListener("input", function () {
    audio.currentTime = seekBar.value;
  });

  // Play/Pause button
  playButton.addEventListener("click", function () {
    if (!status) {
      audio.play();
      playButton.innerHTML = '<i class="fa-regular fa-circle-pause"></i>'; // Change icon to pause
      status = 1;
    } else {
      audio.pause();
      playButton.innerHTML = '<i class="fa-regular fa-circle-play"></i>'; // Change icon to play
      status = 0;
    }
  });

  // Stop button
  stopButton.addEventListener("click", function () {
    audio.pause();
    audio.currentTime = 0;
    playButton.innerHTML = '<i class="fa-regular fa-circle-play"></i>'; // Change icon to play
    status = 0;
  });

  // Forward button
  forwardButton.addEventListener("click", function () {
    audio.currentTime += 5;
  });

  // Backward button
  backwardButton.addEventListener("click", function () {
    audio.currentTime -= 5;
  });

  // Update the time labels
  function updateTimeLabels() {
    currentTimeLabel.textContent = formatTime(audio.currentTime);
    totalTimeLabel.textContent = formatTime(audio.duration);
  }

  // Format time as MM:SS
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }
});
