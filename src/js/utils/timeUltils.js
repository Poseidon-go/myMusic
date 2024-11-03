export function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
}

export function handleStartTime(startTime) {
    const startTimeElement = document.getElementById("start");
    if (!startTimeElement) return;


    startTimeElement.innerHTML = formatTime(startTime);
}

export function handleEndTime(endTime) {
    const EndTimeElement = document.getElementById("end");
    if (!EndTimeElement) return;

    EndTimeElement.innerHTML = formatTime(endTime);
}