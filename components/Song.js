import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import useSpotify from "../Hooks/useSpotify"
import { HeartIcon } from "@heroicons/react/outline"

function msToHMS(duration) {
  let milliseconds = parseInt((duration % 1000) / 100)
  let seconds = parseInt((duration / 1000) % 60)
  let minutes = parseInt((duration / (1000 * 60)) % 60)
  minutes = minutes < 10 ? "0" + minutes : minutes
  seconds = seconds < 10 ? "0" + seconds : seconds

  return +minutes + ":" + seconds
}

export default function Song({ order, song }) {
  const spotifyAPI = useSpotify()

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)

  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(song.track.id)
    setIsPlaying(true)
    spotifyAPI.play({
      uris: [song.track.uri],
    })
  }

  return (
    <div
      key={order}
      onClick={playSong}
      className="transition-all cursor-pointer hover:bg-gray-900 hover:scale-101"
    >
      <div className="flex items-center w-auto justify-around pb-4 pt-4">
        <p className="w-10 ml-10">{`0${order + 1}`.slice(-2)}.</p>
        <div className="flex gap-5 items-center grow">
          <figure className="w-16 h-16">
            <img className="rounded-2xl" src={song.track.album.images[0].url} alt="" />
          </figure>
          <div>
            <h1 className={`font-bold ${currentTrackId === song?.track?.id && "text-green-500"}`}>
              {song.track.name}
            </h1>
            <div>
              {song.track.artists.map((artist, i) => {
                if (i === song.track.artists.length - 1) {
                  return <span key={i}>{artist.name}</span>
                }
                return <span key={i}>{artist.name} x </span>
              })}
            </div>
          </div>
        </div>

        <h3 className="mr-5">{msToHMS(song.track.duration_ms)}</h3>
        <div className="mr-20 flex items-center gap-4">
          <button className="w-6">
            <HeartIcon />
          </button>
          <button>{song.added_at.substring(0, 10)}</button>
        </div>
      </div>
      <hr className="border-t-[0.01px] border-zinc-700 " />
    </div>
  )
}
