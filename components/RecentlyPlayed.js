import { MusicNoteIcon } from "@heroicons/react/solid"
import { useRecoilValue } from "recoil"
import { recentlyPlayedTrackState } from "../atoms/songAtom"
import RecentTrack from "./RecentlyTrack"
import Song from "./Song"

export default function RecentlyPlayed() {
  const recentlyPlayedTrackList = useRecoilValue(recentlyPlayedTrackState)

  return (
    <div className="mt-[270px]">
      <div className="h-[1px] opacity-30 bg-white absolute left-0 right-0"></div>
      <h1 className="flex items-center gap-2 text-4xl w-[100%] font-semibold translate-y-[20px] mt-5 ml-6">
        <span>Recently Played</span>
        <span>
          <MusicNoteIcon className="w-10" />
        </span>
      </h1>
      <ul className="translate-y-[25px]">
        {recentlyPlayedTrackList.map((track, i) => (
          <Song song={track} key={i} order={i} />
        ))}
      </ul>
    </div>
  )
}
