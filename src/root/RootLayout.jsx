import { Outlet } from "react-router-dom"

import Navbar from "../components/Navbar"
import Menubar from "../components/Menubar"
import ButtonIcon from "../components/ButtonIcon"
import useRoute from "../store/route"
import { FaCirclePlus } from "react-icons/fa6";


const RootLayout = () => {
  const route=useRoute(state=>state.route)
  const changeRoute=useRoute(state=>state.changeRoute)
  const handleToRoute=(value)=>{
    changeRoute(value)
  }
  return (
    <main className="relative w-full mi-h-screen">
      <ButtonIcon onClick={()=>handleToRoute('/home/post')} className={`${route.includes("home")?"block":"hidden"} md:hidden fixed bottom-24 right-8 z-20 text-2xl text-white transition-all duration-500`}>
          <FaCirclePlus />
      </ButtonIcon>
      <Menubar />
      <Navbar />
      <div className="w-full min-h-screen md:pl-20 md:pr-7 px-6 sm:pt-20 pt-7 bg-gradient-to-b from-slate-800 to-slate-950 overflow-y-scroll no-scrollbar">
        <Outlet />
      </div>
    </main>
  )
}

export default RootLayout
