import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import useSpotfy from "../Hooks/useSpotify"
import AlbumItem from "./AlbumItem"

export default function AlbumListHome() {
  const { data: session } = useSession()
  const spotifyAPI = useSpotfy()
  const [albumList, setAlbumList] = useState([])

  useEffect(() => {
    spotifyAPI.getUserPlaylists().then((data) => {
      console.log("data: ", data)
      setAlbumList(data.body.items)
    })
  }, [])

  return (
    <>
      <h1 className="text-4xl w-[100%] font-semibold mt-5 ml-5">Your Playlists</h1>
      <ul className="flex gap-5 overflow-x-scroll absolute left-0 right-0 scrollBar box-shadow-list ">
        {albumList?.map((album, i) => (
          <AlbumItem album={album} key={i} />
        ))}
      </ul>
    </>
  )
}
