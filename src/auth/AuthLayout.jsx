import { Navigate, Outlet, useNavigate } from "react-router"
import { useAuth } from "../store/user";
import { useEffect } from "react";
const AuthLayout = () => {
    let isauthenticated=false;
    const navigate=useNavigate()
    const isLoggedIn=useAuth((state)=>state.isLoggedIn)
    useEffect(()=>{
      if(isLoggedIn){
        navigate("/home")
      }
    },[isLoggedIn, navigate])
    return(
        <>
          {isauthenticated ?
            <Navigate to={'/home'} />
            :
            <main className="relative w-full h-screen">
              <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-30 w-full h-full">
                <Outlet />
              </div>
              <img className="absolute h-full w-full left-0 top-0 object-cover -z-0" src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
            </main> 
           }
        </>
    )
}

export default AuthLayout
