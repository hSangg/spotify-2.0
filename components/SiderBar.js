import { FolderOpenIcon, LogoutIcon, PlusCircleIcon } from "@heroicons/react/outline"
import { VolumeUpIcon, HeartIcon } from "@heroicons/react/solid"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState } from "../atoms/playlistAtom"
import { playingTrackState } from "../atoms/songAtom"
import useSpotify from "../Hooks/useSpotify"

function SideBar() {
  const spotifyAPI = useSpotify()
  const URL = useRouter()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const song = useRecoilValue(playingTrackState)

  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getUserPlaylists().then((data) => setPlaylists(data.body.items))
    }
  }, [session, spotifyAPI])

  const handleCheckURL = () => {
    URL.pathname !== "/" && URL.push("/")
  }

  const gotoHomePage = () => {
    URL.push("/home")
  }

  const gotoSearchPage = () => {
    URL.push("/search")
  }

  return (
    <div className="relative transition-all min-w-[50px] h-screen mb-[150px] overflow-y-scroll md:min-w-[200px] scrollBar ">
      <div className="pt-2 pl-5	">
        <button
          onClick={gotoHomePage}
          className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 "
        >
          <img className="w-9 md:w-8 mt-2" src="/crown-front-gradient.png" alt="home" />
          <p className="font-mediummb-5  hidden md:block">
            <a>Home</a>
          </p>
        </button>

        <button
          onClick={gotoSearchPage}
          className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 "
        >
          <img className="w-9 md:w-8 mt-2" src="/zoom-dynamic-gradient.png" alt="home" />
          <p className="font-mediummb-5  hidden md:block">
            <a>Search</a>
          </p>
        </button>

        <button className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 ">
          <img className="w-9 md:w-8 mt-2" src="/star-dynamic-gradient.png" alt="home" />
          <p className="font-medium mb-5 hidden md:block ">Your library</p>
        </button>
        <hr className="border-t-[0.01px] border-zinc-700 mt-5" />
      </div>

      <div className=" pl-5	">
        <button className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 ">
          <PlusCircleIcon className="h-7 ml-1 mt-3 md:ml-0 md:h-5 md:mt-2" />
          <p className="font-medium mb-3 hidden md:block ">Create Playlist.</p>
        </button>

        <button className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 ">
          <FolderOpenIcon className="h-7 ml-1 mt-3 md:ml-0 md:h-5 md:mt-2" />
          <p className="font-medium mb-3 hidden md:block ">Your Episodes.</p>
        </button>

        <button className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 ">
          <HeartIcon className="h-7 ml-1 mt-3 md:ml-0 md:h-5 md:mt-2 fill-blue-400" />
          <p className="font-mediummb-3  hidden md:block ">Liked song.</p>
        </button>
        <hr className="border-t-[0.01px] border-zinc-700 mt-3 mb-3" />

        <h1 className="hidden md:block mb-3 font-bold">PLAYLIST</h1>

        <div className="hidden md:block">
          {playlists.map((item) => {
            return (
              <p
                key={item.id}
                onClick={() => {
                  setPlaylistId(item.id)
                  handleCheckURL()
                }}
                className={`flex items-center gap-2 opacity-50 hover:opacity-100 cursor-pointer mb-1 ${
                  playlistId === item?.id && "opacity-100 text-green-500"
                }`}
              >
                <span>{item.name}</span>
                {playlistId === item?.id && (
                  <span>
                    <VolumeUpIcon className="w-5" />
                  </span>
                )}
              </p>
            )
          })}
        </div>

        <button
          onClick={() => signOut()}
          className="transition-all items-center flex space-x-2 space-y-3 opacity-50 hover:opacity-100 "
        >
          <LogoutIcon className="h-5 mt-2 ml-2 md:ml-0" />
          <p className="font-medium	mb-3 hidden md:block ">Log out</p>
        </button>
      </div>

      <div>
        <figure className="absolute left-0 right-0 mt-5 p-4 md:mt-[30px] ">
          <img src={song?.album?.images?.[0]?.url} alt="" className="rounded-xl" />
        </figure>
      </div>
    </div>
  )
}

export default SideBar
