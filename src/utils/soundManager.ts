/* eslint-disable-next-line import/prefer-default-export */
export function playSound(path: string) {
  const audio = new Audio(path)
  audio.play()
}
