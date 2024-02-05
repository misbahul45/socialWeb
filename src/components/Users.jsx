import { useQuery } from "@tanstack/react-query"
import getAllUsers from "../lib/users/users"
import PropTypes from "prop-types" 
import ButtonIcon from "./ButtonIcon"
import { FaUserCircle } from "react-icons/fa"
import useRoute from "../store/route"
import { useMemo } from "react"
import ButtonFollow from "./home/ButtonFollow"
const Users = ( {uid, action, search} ) => {
  const changeRoute=useRoute(state=>state.changeRoute)

  const { data, isLoading }=useQuery({
    queryKey:["users"],
    queryFn:getAllUsers,
    refetchInterval:2000
  })

  const handleToUser=(id)=>{
    changeRoute(id)
  }

  const users=useMemo(()=>{
    if(data){
        let dataUsers;
        if(action==="random"){
          const randomIndex=Math.random()*data.length
           dataUsers=data.length>5?data.filter((data)=>data.uid!==uid).slice(randomIndex,(randomIndex+5)):data.filter((data)=>data.uid!==uid)
        }else if(action==="followed"){
          dataUsers=data.filter((data)=>data.uid!==uid).filter((data)=>data.friends?.find((data)=>data.friendId===uid && data.isFriend===true || data.isFriend===false ))
        }else if(action==="search"){
          dataUsers=data.filter((user)=>user.displayName.toLowerCase().includes(search.toLowerCase()) && user.uid!==uid)
        }else{
          dataUsers=data.filter((data)=>data.uid!==uid).sort((a,b)=>{
            return new Date(b.createdAt)-new Date(a.createdAt)
          })
        }

        return dataUsers||[]
    }
  },[data,uid,action, search])

  console.log(users)

  return (
    <div className="w-full px-7 mt-4">
      <div className="w-full bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-400 rounded-lg ml-6 flex flex-col gap-2 items-start drop-shadow-xl">
        {
          isLoading?
          <h1 className="ml-4 py-4 text-3xl text-slate-600 animate-pulse">Loading.....</h1>
          :
          users.map((user,index)=>(
            <div key={user.uid} className={`${index===0?"rounded-t-lg":index===users.length-1?"rounded-b-lg":users.length===1?"rounded-lg":""} px-5 py-3 flex items-center justify-between w-full hover:bg-slate-900 hover:drop-shadow-lg transition-all duration-200`}>
              <div onClick={()=>handleToUser(`/user/${user.uid}`)} className="flex cursor-pointer">
                <div>
                  {
                    user.image?
                    <img src={user.image} alt='userImage' className="sm:mr-4 mr-2 md:w-9 md:h-9 sm:w-8 sm:h-8 w-7 h-7 rounded-full object-cover" />
                    :
                    <ButtonIcon className={'mr-0 md::mr-2 flex items-center gap-3 md:text-4xl text-3xl text-slate-100'}>
                            <FaUserCircle/>
                    </ButtonIcon>
                  }
                </div>
                <div className="flex-1">
                    <h1 className="text-md text-slate-400 font-semibold">{user.displayName}</h1>
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

Users.propTypes = {
  uid:PropTypes.string,
  action:PropTypes.string,
  search:PropTypes.string
}

export default Users
