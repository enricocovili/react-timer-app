import audioURL from "../media/Leapfrog.ogg";
import Swal from "sweetalert2";

export function getIdName(id) {
  return id.substring(0, id.lastIndexOf(" "));
}

export function playAudio(id) {
  Swal.close();
  let audio = new Audio(audioURL);
  audio.loop = true;
  audio.play();
  Swal.fire({ title: `${getIdName(id)}'s off`, icon: "warning" }).then(() => {
    audio.loop = false;
    audio.pause();
  });
}

/**
 * @param {Date} input - current value of TimePicker Component
 * @param {boolean} onlySeconds - if true, parseTime return time in seconds
 * @returns {Date|number}
 */
export function parseTime(input, onlySeconds) {
  if (!input || input === null) return getMidNight();
  let time = new Date();
  let durationSeconds =
    input.getHours() * 60 ** 2 + input.getMinutes() * 60 + input.getSeconds();
  if (onlySeconds) return durationSeconds;
  // if the timer is set to 00:00:00
  if (!durationSeconds) return null;
  time.setSeconds(time.getSeconds() + durationSeconds);
  return time;
}

function getMidNight() {
  // workaround to get 00:00:00 at timer's creation
  const time = new Date();
  time.setHours(0, 0, 0, 0);
  return time;
}

export function getInputStorage(id) {
  let inputStorage = localStorage.getItem(`input ${id}`);
  if (inputStorage === "null" || !inputStorage) {
    return getMidNight();
  }
  return new Date(JSON.parse(inputStorage.toString()));
}
