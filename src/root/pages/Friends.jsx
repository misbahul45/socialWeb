import Users from "../../components/Users"
import { useAuth } from "../../store/user"

const Friends = () => {
    const uid=useAuth((state)=>state.user.uid)
  return (
    <div className="min-h-screen lg:px-12 md:px-10 sm:px-7 pb-8 pt-5">
        <div className="flex md:flex-row flex-col justify-evenly w-full mt-5">
            <div className="flex-1 flex flex-col items-center">
                <h1 className="italic lg:text-3xl text-slate-300 font-semibold opacity-60">Followed</h1>
                <Users action="followed" uid={uid} />
            </div>
            <div className="flex-1 flex flex-col items-center">
                <h1 className="italic lg:text-3xl text-slate-300 font-semibold opacity-60">users</h1>
                <Users action="All" uid={uid} />
            </div>
        </div>
    </div>
  )
}

export default Friends
