import { PauseIcon, PlayIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState, playingTrackState } from "../atoms/songAtom"
import useSpotify from "../Hooks/useSpotify"

export default function LikedItem({ track }) {
  const spotifyAPI = useSpotify()
  const [hover, setHover] = useState(false)
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const playSong = () => {
    setCurrentTrackId(track.id)
    setIsPlaying(true)
    setPlayingTrack(track)

    spotifyAPI.play({
      uris: [track.uri],
    })
  }

  return (
    <div
      onMouseEnter={() => {
        setHover(true)
      }}
      onMouseLeave={() => {
        setHover(false)
      }}
    >
      <figure className="relative">
        <img src={track?.album?.images?.[0]?.url} />
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {currentTrackId === track.id ? (
            <PauseIcon
              className={`w-28 md:w-24  transition-all ${hover ? "opacity-100" : "opacity-0"}`}
            />
          ) : (
            <PlayIcon
              onClick={playSong}
              className={`w-28 md:w-24  transition-all ${hover ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>
      </figure>
      <div className="text-center pr-5 mt-2">
        <h1 className={`font-bold ${currentTrackId === track.id && "text-green-500"} text-clamb`}>
          {track.name}
        </h1>
        <div>
          {track.artists.map((artist, i) => {
            if (i === track.artists.length - 1) {
              return <span key={i}>{artist.name}</span>
            }
            return <span key={i}>{artist.name} x </span>
          })}
        </div>
      </div>
    </div>
  )
}
