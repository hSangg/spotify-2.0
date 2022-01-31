export default function msToHMS(duration) {
  let milliseconds = parseInt((duration % 1000) / 100)
  let seconds = parseInt((duration / 1000) % 60)
  let minutes = parseInt((duration / (1000 * 60)) % 60)
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds

  return minutes.toString().slice(-1) + " phút " + seconds + " giây"
}
