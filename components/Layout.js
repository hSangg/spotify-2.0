import SideBar from "./SiderBar"

export default function Navbar({ children }) {
  return (
    <div className="bg-black text-white flex">
      <SideBar />
      {children}
    </div>
  )
}
