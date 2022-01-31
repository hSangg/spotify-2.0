import { ChevronDownIcon, SparklesIcon } from "@heroicons/react/outline"
import { EmojiHappyIcon } from "@heroicons/react/solid"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import useSpotify from "../Hooks/useSpotify"
import ListSongs from "./ListSongs"

const COLOR_LIST = [
  "to-amber-500",
  "to-emerald-500",
  "to-green-500",
  "to-sky-500",
  "to-violet-500",
  "to-purple-500",
  "to-rose-500",
  "to-orange-500",
  "to-yellow-500",
  "to-lime-500",
  "to-teal-500",
  "to-cyan-500",
  "to-indigo-500",
  "to-fuchsia-500",
]

function Center() {
  const { data: session } = useSession()
  const spotifyApi = useSpotify()
  const [color, setColor] = useState("to-rose-500")
  const playlistId = useRecoilValue(playlistIdState)
  const [playlist, setPlaylist] = useRecoilState(playlistState)

  useEffect(() => {
    const newColor = COLOR_LIST[Math.floor(Math.random() * COLOR_LIST.length)]
    setColor(newColor)
  }, [playlistId])

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body)
      })
      .catch((err) => {})
  }, [spotifyApi, playlistId])

  return (
    <div className="flex-gow flex-1 overflow-y-scroll scrollBar h-screen">
      <header className="inline-flex scale-75 float-right  backdrop-blur items-center absolute right-0 top-2 translate-x-4 transparentBG rounded-full pr-6 pl-2 pt-2 pb-2">
        <figure className="w-12">
          <img src={session?.user?.image} alt="??" className=" rounded-full" />
        </figure>
        <div className="ml-3">
          <div className="flex items-center">
            <h1 className="text-1xl font-bold ">{session?.user?.name} </h1>
            <span>
              <ChevronDownIcon className="w-5 ml-2" />
            </span>
          </div>
          <p className="text-s">Listen paradise sound</p>
        </div>
      </header>

      <section className={`h-80 bg-gradient-to-t from-black ${color}`}>
        <div className="flex translate-x-7 translate-y-12 ">
          <figure className="w-48 h-48 flex-shrink-0">
            <img src={playlist?.images?.[0]?.url} alt={playlist?.id} />
          </figure>
          <div className="ml-7">
            <p className="font-bold mb-4 flex gap-2">
              <span>PLAY LIST</span> <EmojiHappyIcon className="w-5" />{" "}
            </p>
            <h1 className="font-extrabold text-6xl ">{playlist?.name}</h1>
            <h1 className="uppercase font-bold xt-1xl mt-5 mb-2 tracking-widest">
              Từ: {playlist?.owner?.display_name}.
            </h1>

            <p className="flex items-center gap-1">
              <span>
                <SparklesIcon className="w-5 h-5" />
              </span>
              <span>{playlist?.description}</span>.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <ListSongs />
      </section>
    </div>
  )
}

export default Center
