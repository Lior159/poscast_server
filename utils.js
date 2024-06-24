const formatDate = (date) => {
  const d = new Date(0);
  d.setUTCSeconds(date);

  return d.toLocaleDateString("he-IL");
};

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  // Ensure that both minutes and seconds are two digits
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

module.exports = {
  formatDate,
  formatDuration,
};
