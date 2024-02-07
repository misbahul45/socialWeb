import { MdHomeWork } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoBookmarks,IoSettings } from "react-icons/io5";
import ButtonIcon from "./ButtonIcon";
import { useNavigate } from 'react-router-dom'
import useRoute from "../store/route";
import { useEffect } from "react";
import { useAuth } from "../store/user";

const Menubar = () => {
  const navigate=useNavigate('/')
  const route=useRoute(state=>state.route)
  const changeRoute=useRoute(state=>state.changeRoute)
  const user=useAuth(state=>state.user)


  const handleToRoute=(value)=>{
    changeRoute(value)
  }
  useEffect(()=>{
    if(user.displayName)navigate(route);
    else navigate("/sign-in")
  },[route,navigate,user])


  return (
    <div className="flex flex-row items-center md:flex-col fixed bottom-0 md:top-0 left-0 md:w-14 md:px-0 px-3 w-full md:h-full h-16 bg-slate-900 z-30">
      <div className="flex-1 flex flex-row md:flex-col items-center justify-center gap-5">
        <ButtonIcon onClick={()=>handleToRoute('/home')} className={`w-full flex items-center justify-center py-2 md:px-2 text-2xl text-slate-100 rounded-md  ${route==="/home"?"shadow-lg bg-slate-100 text-slate-900":"hover:shadow-lg hover:bg-slate-100 hover:text-red-600"} transition-all duration-500`}>
          <MdHomeWork />
        </ButtonIcon>
        <ButtonIcon onClick={()=>handleToRoute('/messages')} text={""} textClassName={'lg:text-[15px] absolute -top-2 right-2 px-1.5 bg-red-500 rounded-full'}  className={`relative w-full flex items-center justify-center py-2 md:px-2 text-2xl text-slate-100 rounded-md  ${route.includes("/messages")?"shadow-lg bg-slate-100 text-slate-900":"hover:shadow-lg hover:bg-slate-100 hover:text-red-600"} transition-all duration-500`}>
          <AiFillMessage />
        </ButtonIcon>
        <ButtonIcon onClick={()=>handleToRoute('/friends')} text={""} textClassName={'lg:text-[15px] absolute -top-2 right-2 px-1.5 bg-red-500 rounded-full'}  className={`relative w-full flex items-center justify-center py-2 md:px-2 text-2xl text-slate-100 rounded-md ${route==="/friends"?"shadow-lg bg-slate-100 text-slate-900":"hover:shadow-lg hover:bg-slate-100 hover:text-red-600"} transition-all duration-500`}>
          <FaUserFriends />
        </ButtonIcon>
        <ButtonIcon onClick={()=>handleToRoute('/bookmarks')} text={""} textClassName={'lg:text-[15px] absolute -top-2 right-2 px-1.5 bg-red-500 rounded-full'}  className={`relative w-full flex items-center justify-center py-2 md:px-2 text-2xl text-slate-100 rounded-md  ${route==="/bookmarks"?"shadow-lg bg-slate-100 text-slate-900":"hover:shadow-lg hover:bg-slate-100 hover:text-red-600"} transition-all duration-500`}>
          <IoBookmarks />
        </ButtonIcon>
        <ButtonIcon onClick={()=>handleToRoute('/setting')}  className={`w-full flex items-center justify-center py-2 md:px-2 text-2xl text-slate-100 rounded-md  ${route==="/setting"?"shadow-lg bg-slate-100 text-slate-900":"hover:shadow-lg hover:bg-slate-100 hover:text-red-600"} transition-all duration-500`}>
          <IoSettings className={`${route==="/setting"?"animate-spin":""}`} />
        </ButtonIcon>
      </div>
    </div>
  )
}

export default Menubar
