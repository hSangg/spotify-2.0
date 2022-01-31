import { useSession } from "next-auth/react"
import SideBar from "./SiderBar"

export default function Navbar({ children }) {
  const { data: sesstion } = useSession()

  return (
    <div className="bg-black text-white flex">
      {sesstion?.user?.name && <SideBar />}
      {children}
    </div>
  )
}
