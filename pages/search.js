import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import Player from "../components/Player"
import SongSearch from "../components/SongSearch"
import useSpotify from "../Hooks/useSpotify"
import { useDebounce } from "use-lodash-debounce"

function Search() {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])

  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken
  const spotifyAPI = useSpotify()

  const searchDebounce = useDebounce(search, 200)

  useEffect(() => {
    if (!search) return setSearchResult([])
    if (!accessToken) return

    spotifyAPI
      .searchTracks(searchDebounce)
      .then((res) => setSearchResult(res.body.tracks.items))
      .catch((error) => {
        throw new Error(error)
      })
  }, [searchDebounce, accessToken])

  return (
    <>
      <div className="relative flex-1 overflow-y-scroll h-screen scrollBar">
        <div className="bg-gradient-to-b from-blue-500 h-20 absolute left-0 right-0"></div>
        <div className=" mt-6 ml-6">
          <form>
            <input
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              className="searchSong"
              type="text"
              placeholder="ENTER YOUR SONG NAME "
            />
          </form>

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

export default Search
