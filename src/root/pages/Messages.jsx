import { Outlet } from  "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import getAllUsers from "../../lib/users/users"
import UsersLoading from "../../components/messages/Sub/UsersLoading"
import { FaLocationArrow } from "react-icons/fa";
import useRoute from "../../store/route";
import UsersMessages from "../../components/messages/Sub/UsersMessages";
import { useMemo } from "react";
import { useAuth } from "../../store/user";
const Messages = () => {
  const uid=useAuth((state)=>state.user.uid)
  const route=useRoute(state=>state.route)
  const { data, isLoading }=useQuery({
       queryKey:["messages friends"],
      queryFn:getAllUsers
  })
    const usersFriends=useMemo(()=>{
      if(data){
        return data.filter((user)=>user.friends.some((friend)=>{
          return friend.friendId===uid && friend.isFriend===true
        }))
      }
    },[data,uid])
  return (
    <div className="h-screen w-full flex gap-4 pb-4 pt-20">        
      <div className="w-80 border border-slate-600 rounded-xl overflow-y-auto">
        { isLoading?
            <UsersLoading />
          :
            <>
              {usersFriends.map((user,index)=>(
                  <UsersMessages isLastIndex={usersFriends.length>6?index===usersFriends.length-1:false} isFirstIndex={index===0} uImage={user.image} uName={user.displayName} uFriendId={user.uid} key={user.uid} />
                ))
              }
            </>

        }
      </div>
      <div className="flex-1 flex gap-4 justify-center items-center">
        {route==="/messages"?
          <>
            <h1 className="lg:text-5xl font-semibold text-slate-700 font-serif italic animate-pulse">Send Messages</h1>
            <span className="text-4xl text-slate-700 animate-pulse opacity-20">
                <FaLocationArrow />
            </span>
          </>
          :
          <>
            <Outlet />
          </>
        }
      </div>
    </div>
  )
}

export default Messages
