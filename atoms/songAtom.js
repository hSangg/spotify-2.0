import { atom } from "recoil"

export const currentTrackIdState = atom({
  key: "currentTrackIdState",
  default: null,
})

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false,
})

export const playingTrackState = atom({
  key: "playingTrackState",
  default: "",
})

export const likeSongListState = atom({
  key: "likeSongListState",
  default: [],
})
