import { useSession } from "next-auth/react"
import { useEffect, useState, useCallback } from "react/cjs/react.development"
import { useRecoilState, useRecoilValue } from "recoil"
import { currentTrackIdState, isPlayingState, playingTrackState } from "../atoms/songAtom"
import useSongInfor from "../Hooks/useSongInfor"
import useSpotify from "../Hooks/useSpotify"
import {
  SwitchHorizontalIcon,
  RefreshIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/react/outline"

import { PlayIcon, StopIcon } from "@heroicons/react/solid"
import { volumeState } from "../atoms/playerAtom"

const COLOR_LIST = [
  "to-amber-800",
  "to-emerald-800",
  "to-green-800",
  "to-sky-800",
  "to-violet-800",
  "to-purple-800",
  "to-rose-800",
  "to-orange-800",
  "to-yellow-800",
  "to-lime-800",
  "to-teal-800",
  "to-cyan-800",
  "to-indigo-800",
  "to-fuchsia-800",
]

export default function Player() {
  const spotifyAPI = useSpotify()
  const { data: session } = useSession()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)

  //need one
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  //need two
  // const playingTrack = useR(playingTrackState)

  const [volume, setVolume] = useRecoilState(volumeState)
  const [color, setColor] = useState("to-rose-500")
  const [repeat, setRepeat] = useState(false)
  const [shuffle, setShuffle] = useState(true)

  const songInfor = useSongInfor()

  const fetchCurrentSong = () => {
    if (!songInfor) {
      spotifyAPI.getMyCurrentPlayingTrack().then((data) => {
        setCurrentTrackId(data.body?.item?.id)

        spotifyAPI.getMyCurrentPlaybackState().then((data) => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  useEffect(() => {
    const newColor = COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)]
    setColor(newColor)
  }, [songInfor])

  useEffect(() => {
    if (spotifyAPI.getAccessToken() && !currentTrackId) {
      //fetch song infor
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackIdState, spotifyAPI, session])

  const handlePlayPause = () => {
    spotifyAPI.getMyCurrentPlaybackState().then((data) => {
      if (data.body.is_playing) {
        spotifyAPI.pause()
        setIsPlaying(false)
      } else {
        spotifyAPI.play()
        setIsPlaying(true)
      }
    })
  }

  const handleRepeatClick = () => {
    spotifyAPI.setRepeat("track")
    setRepeat((pre) => !pre)
  }

  const setVolumeDebounce = useCallback(() => {
    if (session?.user?.accessToken) {
      spotifyAPI.setVolume(volume).catch((error) => {
        throw new Error(error)
      })
    }
  }, [volume])

  useEffect(() => {
    setVolumeDebounce()
  }, [volume])

  const handleShuffleClick = () => {
    setShuffle((pre) => !pre)
    spotifyAPI.setShuffle(shuffle)
  }

  return (
    <div
      className={`transition-all grid grid-cols-3 translate-y-28 ${
        currentTrackId ? "translate-y-0" : undefined
      } items-center justify-between backdrop-blur p-4 bg-gradient-to-b from-transparent ${color}`}
    >
      <div className="flex items-center ">
        <figure className="w-16 h-16">
          <img src={songInfor?.album?.images?.[0]?.url} alt="" />
        </figure>

        <div className="ml-5">
          <h1 className="font-bold">{songInfor?.name}</h1>
          <div>
            {songInfor?.artists?.map((artist, i) => {
              if (i === songInfor?.artists.length - 1) {
                return <span key={i}>{artist.name}</span>
              }
              return <span key={i}>{artist.name} x </span>
            })}
          </div>
        </div>
      </div>

      <div className=" flex items-center icon-player justify-center gap-7 ">
        <SwitchHorizontalIcon
          onClick={handleShuffleClick}
          className={!shuffle ? "text-indigo-600" : undefined}
        />
        <ChevronLeftIcon />
        {!isPlaying && <PlayIcon onClick={handlePlayPause} className="icon_play_pause" />}
        {isPlaying && <StopIcon onClick={handlePlayPause} className="icon_play_pause" />}
        <ChevronRightIcon onClick={() => spotifyAPI.skipToNext()} />
        <RefreshIcon
          onClick={handleRepeatClick}
          className={repeat ? "text-indigo-600" : undefined}
        />
      </div>

      <div className="icon-player flex items-center gap-4 justify-end mr-2.5">
        <VolumeOffIcon className=" flex items-center" onClick={() => setVolume(0)} />

        <input
          min={0}
          value={volume}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
          type="range"
          className=" form-range appearance-none h-2 p-0 bg-blue-600 transition-all hover:bg-white rounded-full focus:outline-none focus:ring-0 focus:shadow-none     "
        />

        <VolumeUpIcon
          onClick={() => {
            volume < 100 && setVolume((pre) => pre + 10)
          }}
        />
      </div>
    </div>
  )
}
