import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Menubar from "../components/Menubar"
import useRoute from "../store/route"
import ButtonIcon from "../components/ButtonIcon"
import { FaSearch } from "react-icons/fa"



const RootLayout = () => {
  const route=useRoute(state=>state.route)
  const changeRoute=useRoute(state=>state.changeRoute)
  return (
    <main className="relative w-full mi-h-screen">
      <ButtonIcon onClick={()=>changeRoute('/posts')} className={`${route==="/home" || route==="/bookmarks" || route.includes("/friends") ?"block":"hidden"} sm:hidden fixed bottom-40 right-8 text-2xl text-slate-100  p-2 rounded-full bg-slate-900 z-20 `}>
        <FaSearch  />
      </ButtonIcon>
      <Menubar />
      <Navbar />
      <div className={`w-full min-h-screen md:pl-20 md:pr-7  ${!route.includes("messages")?" sm:pt-20":""} bg-gradient-to-b from-slate-800 to-slate-950 overflow-y-scroll no-scrollbar`}>
        <Outlet />
      </div>
    </main>
  )
}

export default RootLayout
