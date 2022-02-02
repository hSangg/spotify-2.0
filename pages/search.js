import { useSession } from "next-auth/react"
import { useEffect, useState } from "react/cjs/react.development"
import Player from "../components/Player"
import SongSearch from "../components/SongSearch"
import useSpotify from "../Hooks/useSpotify"

export default function Seach({}) {
  const [search, setSearch] = useState()
  const [searchResult, setSearchResult] = useState([])

  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken
  const spotifyAPI = useSpotify()

  useEffect(() => {
    if (!search) return setSearchResult([])
    if (!accessToken) return

    spotifyAPI
      .searchTracks(search)
      .then((res) => setSearchResult(res.body.tracks.items))
      .catch((error) => {
        throw new Error(error)
      })
  }, [search, accessToken])

  return (
    <>
      <div className="relative flex-1 overflow-y-scroll h-screen scrollBar">
        <div className="bg-gradient-to-b from-blue-500 h-20 absolute left-0 right-0"></div>
        <div className=" mt-6 ml-6">
          <input
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            className="searchSong"
            type="text"
            placeholder="ENTER YOUR SONG NAME "
          />

          <div className="mt-5 mb-20">
            {searchResult.map((song, i) => {
              return <SongSearch song={song} key={i} />
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <Player />
      </div>
    </>
  )
}
