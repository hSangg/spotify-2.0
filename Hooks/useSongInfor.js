import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { currentTrackIdState } from "../atoms/songAtom"
import useSpotify from "./useSpotify"

export default function useSongInfor() {
  const spotifyAPI = useSpotify()
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
  const [songInfor, setSongInfor] = useState()

  useEffect(() => {
    ;(async () => {
      if (currentTrackId) {
        const trackInfor = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
          headers: {
            Authorization: `Bearer ${spotifyAPI.getAccessToken()}`,
          },
        }).then((res) => res.json())
        setSongInfor(trackInfor)
      }
    })()
  }, [currentTrackId, spotifyAPI])

  return songInfor
}
