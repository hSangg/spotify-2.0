import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import SpotifyWebPlayer from "react-spotify-web-playback/lib"
import { useRecoilState, useRecoilValue } from "recoil"
import { isPlayingState, playingTrackState } from "../atoms/songAtom"

export default function Player() {
  const { data: session } = useSession()

  //need one
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  //need two
  const playingTrack = useRecoilValue(playingTrackState)
  const uri = playingTrack?.uri

  const [showPlayer, setShowPlayer] = useState(false)

  useEffect(() => {
    setShowPlayer(true)
  }, [])

  useEffect(() => {
    if (uri) {
      setIsPlaying(true)
    }
    if (!session?.user?.accessToken) return null
  }, [session?.user?.accessToken])

  if (!session?.user?.accessToken) return null
  return (
    <div>
      {showPlayer && (
        <SpotifyWebPlayer
          styles={{
            sliderTrackColor: "transparent",
            sliderColor: "#22c55e",
            sliderHandleColor: "white",
          }}
          token={session.user.accessToken}
          showSaveIcon
          callback={(state) => {
            setIsPlaying(state.isPlaying)
          }}
          play={isPlaying}
          uris={uri ? [uri] : []}
          autoPlay={true}
        />
      )}
    </div>
  )
}
