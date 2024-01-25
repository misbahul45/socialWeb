import { useQuery } from "@tanstack/react-query"
import getAllUsers from "../../lib/users/users"
import { useAuth } from "../../store/user"
import ButtonIcon from "../ButtonIcon"
import { FaUserCircle } from "react-icons/fa"
const Users = () => {
  const uid=useAuth((state)=>state.user.uid)
  const { data:users, isLoading }=useQuery({
    queryKey:["users"],
    queryFn:()=>getAllUsers(uid)
  })
  return (
    <div className="px-7 mt-4">
      <h1 className="text-center text-2xl italic font-semibold uppercase text-slate-100 mb-3">users</h1>
      <div className="w-full pt-4 pb-3 pl-7 pr-2 bg-gradient-to-br from-slate-800 to-slate-700  border border-slate-400 rounded-lg ml-6 flex flex-col gap-2 items-start drop-shadow-xl">
        {
          isLoading?
          <h1 className="text-3xl text-slate-600 animate-pulse">Loading.....</h1>
          :
          users.map((user)=>(
            <div key={user.uid} className="flex cursor-pointer">
              <div>
                {
                  user.image?
                  <img src={user.image} alt='userImage' className="sm:mr-4 mr-2 md:w-9 md:h-9 sm:w-8 sm:h-8 w-7 h-7 rounded-full object-cover" />
                  :
                  <ButtonIcon  className={'mr-0 md::mr-2 flex items-center gap-3 md:text-4xl text-3xl text-slate-100'}>
                          <FaUserCircle/>
                  </ButtonIcon>
                }
              </div>
              <div className="flex-1">
                  <h1 className="text-lg text-slate-400 font-semibold">{user.displayName}</h1>
              </div>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Users
