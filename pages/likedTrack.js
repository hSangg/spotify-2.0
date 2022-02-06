import { useRecoilState } from "recoil"
import { likeSongListState } from "../atoms/songAtom"
import LikedItem from "../components/LikedItem"
export default function LikedTrack() {
  const [likeList, setLikeList] = useRecoilState(likeSongListState)

  return (
    <>
      <ul className="grid gap-5 h-screen overflow-y-scroll scrollBar sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-6">
        {likeList.map((track, i) => (
          <LikedItem track={track} key={i} />
        ))}
      </ul>
    </>
  )
}
