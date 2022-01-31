import { HeartIcon } from "@heroicons/react/outline"
import { LightningBoltIcon } from "@heroicons/react/solid"
import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import useSpotify from "../Hooks/useSpotify"
import useFormatTime from "../Hooks/useFormatTime"

export default function SongSearch({ song, index }) {
  const spotifyAPI = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(song.id)
    setIsPlaying(true)
    spotifyAPI.play({
      uris: [song.uri],
    })
  }

  const random = () => {
    return Math.floor(Math.random() * 2)
  }
  const randomNumber = random()

  return (
    <>
      <div
        onClick={playSong}
        key={index}
        className="grid cursor-pointer items-center grid-cols-2 pt-5 pb-5 hover:bg-gray-900 pl-2 pr-2"
      >
        <div className="flex gap-5">
          <figure className="w-20 h-20">
            <img className="rounded-lg" src={song?.album?.images?.[0].url} />
          </figure>
          <div className=" ">
            <h1 className="font-bold text-lg">{song.name}</h1>
            <div>
              {song.artists.map((artist, i) => {
                if (i === song.artists.length - 1) {
                  return <span key={i}>{artist.name}</span>
                }
                return <span key={i}>{artist.name} x </span>
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <h3 className="">{useFormatTime(song?.duration_ms)}</h3>
          <button className="w-6 ml-5 mr-2">
            {randomNumber === 1 && <HeartIcon />}
            {randomNumber === 0 && <LightningBoltIcon className="fill-blue-600" />}
          </button>
        </div>
      </div>
      <hr className="border-t-[0.01px] border-zinc-700 " />
    </>
  )
}
