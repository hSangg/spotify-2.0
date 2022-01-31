import { FolderOpenIcon, HeartIcon, LogoutIcon, PlusCircleIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { playlistIdState } from "../atoms/playlistAtom"
import useSpotify from "../Hooks/useSpotify"

function SideBar() {
  const spotifyAPI = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getUserPlaylists().then((data) => setPlaylists(data.body.items))
    }
  }, [session, spotifyAPI])

  return (
    <div className="h-screen overflow-y-scroll pr-6  scrollBar">
      <div className="pt-2 pl-5	">
        <button className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 ">
          <img className="w-8 mt-2" src="/crown-front-gradient.png" alt="home" />
          <p className="font-medium mb-5 ">
            <Link href="/">
              <a>Home</a>
            </Link>
          </p>
        </button>

        <button className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 ">
          <img className="w-8 mt-2" src="/zoom-dynamic-gradient.png" alt="home" />
          <p className="font-medium mb-5 ">
            <Link href="/search">
              <a>Search</a>
            </Link>
          </p>
        </button>

        <button className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 ">
          <img className="w-8 mt-2" src="/star-dynamic-gradient.png" alt="home" />
          <p className="font-medium	 mb-5 ">Your library</p>
        </button>
        <hr className="border-t-[0.01px] border-zinc-700 mt-5" />
      </div>

      <div className=" pl-5	">
        <button className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 ">
          <PlusCircleIcon className="h-5 mt-2" />
          <p className="font-medium	 mb-3 ">Create Playlist.</p>
        </button>

        <button className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 ">
          <FolderOpenIcon className="h-5 mt-2" />
          <p className="font-medium	 mb-3 ">Your Episodes.</p>
        </button>

        <button className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 ">
          <HeartIcon className="h-5 mt-2" />
          <p className="font-medium	mb-3  ">Liked song.</p>
        </button>
        <hr className="border-t-[0.01px] border-zinc-700 mt-3 mb-3" />

        <h1 className="mb-3 font-bold">PLAYLIST</h1>

        {playlists.map((item) => {
          return (
            <p
              key={item.id}
              onClick={() => {
                setPlaylistId(item.id)
              }}
              className=" opacity-50 hover:opacity-100 cursor-pointer mb-1"
            >
              {item.name}
            </p>
          )
        })}

        <button
          onClick={() => signOut()}
          className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 "
        >
          <LogoutIcon className="h-5 mt-2" />
          <p className="font-medium	mb-3  ">Log out</p>
        </button>
      </div>
    </div>
  )
}

export default SideBar
