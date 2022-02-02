import { ChevronDownIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  return (
    <div className="h-screen flex-1 relative">
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
    </div>
  )
}
