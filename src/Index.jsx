import { useAuth } from "./store/user"
import { Navigate } from "react-router-dom"

const Start = () => {
    const isLoggedIn=useAuth((state)=>state.isLoggedIn)
      if(isLoggedIn){
        return <Navigate to={'/home'} />
      }else{
        return <Navigate to={'/sign-in'} />
      }
}

export default Start
