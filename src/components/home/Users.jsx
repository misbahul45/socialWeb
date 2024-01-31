import { useQuery } from "@tanstack/react-query"
import getAllUsers from "../../lib/users/users"
import { useAuth } from "../../store/user"
import ButtonIcon from "../ButtonIcon"
import { FaUserCircle } from "react-icons/fa"
import useRoute from "../../store/route"
import { useMemo } from "react"
import ButtonFollow from "./buttonFollow"
const Users = () => {
  const changeRoute=useRoute(state=>state.changeRoute)
  const uid=useAuth((state)=>state.user.uid)

  const { data, isLoading }=useQuery({
    queryKey:["users"],
    queryFn:getAllUsers,
    refetchInterval:1000
  })

  const handleToUser=(id)=>{
    changeRoute(id)
  }

  const users=useMemo(()=>{
    if(data){
      const randomIndex=Math.random()*data.length
      return data.length>5?data.filter((data)=>data.uid!==uid).slice(randomIndex,(randomIndex+5)):data.filter((data)=>data.uid!==uid)
    }
  },[data,uid])


  return (
    <div className="px-7 mt-4">
      <h1 className="text-center text-2xl italic font-semibold uppercase text-slate-100 mb-3">users</h1>
      <div className="w-full bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-400 rounded-lg ml-6 flex flex-col gap-2 items-start drop-shadow-xl">
        {
          isLoading?
          <h1 className="text-3xl text-slate-600 animate-pulse">Loading.....</h1>
          :
          users.map((user,index)=>(
            <div key={user.uid} className={`${index===0?"rounded-t-lg":index===users.length-1?"rounded-b-lg":""} px-5 py-1.5 flex items-center justify-between w-full hover:bg-slate-900 hover:drop-shadow-lg transition-all duration-200`}>
              <div onClick={()=>handleToUser(`/user/${user.uid}`)} className="flex cursor-pointer">
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
              <ButtonFollow uid={uid} data={data} idFriend={user.uid} />
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Users
