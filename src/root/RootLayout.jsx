import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Menubar from "../components/Menubar"
import useRoute from "../store/route"


const RootLayout = () => {
  const route=useRoute(state=>state.route)
  return (
    <main className="relative w-full mi-h-screen">
      <Menubar />
      <Navbar />
      <div className={`w-full min-h-screen md:pl-20 md:pr-7  ${!route.includes("messages")?" sm:pt-20 pt-7":""} bg-gradient-to-b from-slate-800 to-slate-950 overflow-y-scroll no-scrollbar`}>
        <Outlet />
      </div>
    </main>
  )
}

export default RootLayout
