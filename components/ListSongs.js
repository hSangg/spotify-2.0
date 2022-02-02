import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
import Song from "./Song"

export default function ListSongs() {
  const playlist = useRecoilValue(playlistState)

  return (
    <div className="text-white mt-5">
      {playlist?.tracks?.items?.map((song, index) => (
        <Song key={song?.track?.id} song={song} order={index} />
      ))}
    </div>
  )
}
