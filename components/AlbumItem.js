import { PlayIcon } from "@heroicons/react/solid"
import { useRouter } from "next/router"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { playlistIdState } from "../atoms/playlistAtom"
import useSpotify from "../Hooks/useSpotify"

export default function AlbumItem({ album }) {
  const [isHover, setIsHover] = useState("")
  const router = useRouter()

  const spotifyAPI = useSpotify()
  const [playlist, setPlaylist] = useRecoilState(playlistIdState)
  const handleIconClick = () => {
    setPlaylist(album?.id)
    router.push("/")
  }
  return (
    <div
      className="flex flex-col items-center "
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <figure className="relative w-[200px] h-[200px]">
        <div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]	">
          <PlayIcon
            onClick={handleIconClick}
            className={`w-20 fill-green-600 ${isHover ? "opacity-100" : "opacity-0"} `}
          />
        </div>

        <img src={album?.images?.[0]?.url} alt="" className="rounded-3xl" />
      </figure>

      <h1 className="text-1xl ml-5 mr-5 text-center mt-5 font-bold">{album?.name}</h1>
    </div>
  )
}
