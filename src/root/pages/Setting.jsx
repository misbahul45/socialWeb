import ButtonIcon from "../../components/ButtonIcon"
import CardUser from "../../components/setting/CardUser"
import { CiLogin } from "react-icons/ci";
import { useAuth } from "../../store/user";
import { toast } from "react-toastify"
import { useNavigate } from"react-router-dom"
import useRoute from "../../store/route";

const Setting = () => {
  const userLogout=useAuth(state=>state.userLogout)
  const navigate=useNavigate()
  const changeRoute=useRoute(state=>state.changeRoute)
  const handleLogout=async()=>{
    await userLogout();
    toast.success("Succes Log out")
    navigate("/sign-in")
    changeRoute("/home")
  }
  return (
    <div className="relative w-full pb-5 flex flex-col items-center">
      <h1 className="text-3xl text-slate-50 font-semibold font-serif mb-8">Edit Profile</h1>
      <CardUser />
      <ButtonIcon onClick={handleLogout} className={'absolute -bottom-20 md:-bottom-7 right-0 md:right-8 text-4xl text-red-600'} text={'logOut'} textClassName={'text-lg text-white font-semibold'}>
          <CiLogin />
      </ButtonIcon>
    </div>
  )
}

export default Setting
