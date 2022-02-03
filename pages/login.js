import { getProviders, signIn } from "next-auth/react"

const Login = ({ providers }) => {
  return (
    <div className="bg-black h-screen w-[100%] flex items-center justify-center ">
      {Object?.values?.[providers]?.map((provider, index) => (
        <div key={index}>
          <button
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            className="font-semibold bg-green-600 rounded-sm p-2 border-r-2 border-t-2 text-white"
          >
            Login with {provider.name}.
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
