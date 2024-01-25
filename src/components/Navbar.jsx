import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../store/user";
import { useNavigate } from "react-router-dom"
import ButtonIcon from "./ButtonIcon";
import useRoute from "../store/route";
import { useState } from "react";
const Navbar = () => {
    const [search, setSearch]=useState("")
    const user=useAuth((state)=>state.user)
    const navigate=useNavigate();
    const changeRoute=useRoute((state)=>state.changeRoute)

    const handleToPersonalUser=()=>{
        changeRoute(`/user/${user.uid}`)
        navigate(`/user/${user.uid}`)
    }
  return (
    <header className="hidden w-full bg-slate-900 fixed top-0 sm:flex gap-9 md:gap-0 md:justify-between items-center md:px-24 px-7 h-16 z-20">
        <form className="w-full md:max-w-md flex gap-4">
            <input onChange={(e)=>setSearch(e.target.value)} value={search} type="text" placeholder="Search" className={`${search!==""?"lg:w-64":"w-auto"} pl-4 pb-2 py-1 outline-none bg-slate-700 text-white placeholder:text-white  placeholder:opacity-60 rounded-md shadow-lg focus:placeholder:opacity-80 focus:flex-1 focus:ring-2 focus:ring-slate-50 transition-all duration-500 peer`} />
            <button className={`px-3 bg-slate-900 text-slate-200 font-semibold rounded-md shadow-white/20 ring-2 ring-slate-400 shadow-lg hover:bg-slate-700 hover:shadow-md hover:scale-105 transition-all duration-200 peer-focus:bg-slate-600`}>Search</button>
        </form>
        <div className="hidden md:block" onClick={handleToPersonalUser}>
            {
                user.photoURL?
                <div className="flex items-center gap-3 cursor-pointer">
                    <img src={user.photoURL} alt="userImage" className="w-10 h-10 rounded-full border-2 object-cover" />
                    <h1 className={'capitalize font-semibold font-serif text-lg text-slate-50'}>{user.displayName}</h1>
                </div>
                :
                <ButtonIcon text={user.displayName} className={'flex items-center gap-3 text-3xl text-slate-100'} textClassName={'capitalize font-semibold font-serif text-lg'}>
                    <FaUserCircle />
                </ButtonIcon>
            }
        </div>
        <h1 className="block md:hidden sm:text-3xl text-2xl font-semibold font-serif text-slate-200">Knixxgram</h1>
    </header>
  )
}

export default Navbar
