import Users from "../../components/Users"
import { useAuth } from "../../store/user"

const Friends = () => {
    const uid=useAuth((state)=>state.user.uid)
  return (
    <div className="min-h-screen px-12 pb-8  pt-5">
        <form className="mx-auto w-full max-w-xl flex gap-4">
            <input type="text" placeholder="Search User" className="w-full pl-4 pt-2 pb-1.5 rounded-sm outline-none drop-shadow-xl bg-slate-700 placeholder:text-slate-400 focus:text-slate-300 focus:bg-slate-800 focus:shadow-lg focus:shadow-white/10 focus:ring focus:ring-slate-700 transition-all duration-200"  />
            <button className="px-2 w-28 bg-blue-700 text-slate-100 rounded-md">Search</button>
        </form>
        <div className="flex justify-evenly w-full mt-5">
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
