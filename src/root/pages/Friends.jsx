import Users from "../../components/Users"
import { useAuth } from "../../store/user"

const Friends = () => {
    const uid=useAuth((state)=>state.user.uid)
  return (
    <div className="min-h-screen sm:px-7 md:pb-8 pb-20 pt-5">
        <div className="flex lg:flex-row gap-4 flex-col w-full mt-5">
            <div className="flex-1">
                <h1 className="text-center italic md:text-3xl text-2xl text-slate-300 font-semibold opacity-60">Followed</h1>
                <Users action="followed" uid={uid} />
            </div>
            <div className="flex-1">
                <h1 className="text-center italic md:text-3xl text-2xl text-slate-300 font-semibold opacity-60">users</h1>
                <Users action="All" uid={uid} />
            </div>
        </div>
    </div>
  )
}

export default Friends
