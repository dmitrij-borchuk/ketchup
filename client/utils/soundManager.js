/* eslint-disable-next-line import/prefer-default-export */
export function playSound(path) {
  const audio = new Audio(path);
  audio.play();
}
