import { useSession } from "next-auth/react"
import Player from "./Player"
import SideBar from "./SiderBar"

export default function Navbar({ children }) {
  const { data: sesstion } = useSession()

  return (
    <div className="bg-black text-white flex">
      {sesstion?.user?.name && <SideBar />}
      <div className="fixed bottom-0 left-0 right-0 z-10">
        <Player />
      </div>
      {children}
    </div>
  )
}
