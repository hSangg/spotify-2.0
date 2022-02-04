import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import Player from "../components/Player"
import SongSearch from "../components/SongSearch"
import useSpotify from "../Hooks/useSpotify"

function Search() {
  const [search, setSearch] = useState("")
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
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              value={search || ""}
              onChange={(e) => setSearch(e.target.value)}
              className="searchSong text-[3rem] mt-5 md:mt-0 md:text-[4rem]"
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
    </>
  )
}

export default Search
