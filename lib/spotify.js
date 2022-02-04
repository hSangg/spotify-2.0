import SpotifyWebApi from "spotify-web-api-node"

const scopes = [
  // "user-read-email",
  // "playlist-read-collaborative",
  // "playlist-read-private",
  // "streaming",
  // "user-read-playback-state",
  // "user-modify-playback-state",
  // "user-read-currently-playing",
  // "user-read-playback-position",
  // "playlist-modify-private",

  "user-read-email",
  "playlist-read-private",
  "user-read-email",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-library-modify",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-recently-played",
  "user-follow-read",
].join(",")

const params = {
  scope: scopes,
}

const queryParamString = new URLSearchParams(params)

export const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`

const spotifyAPI = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyAPI
