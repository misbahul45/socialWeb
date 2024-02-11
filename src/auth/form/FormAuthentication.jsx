import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from '../../store/user';

const FormAuth = ({ username, email, password, setUsername, setEmail, setPassword, action }) => {

    const signUp=useAuth((state)=>state.userSignUp)
    const signIn=useAuth((state)=>state.userSignIn)

    const isError= useAuth((state)=>state.isError)
    const isLoggedIn= useAuth((state)=>state.isLoggedIn)
    const error= useAuth((state)=>state.error)
    
    const handleSignIn=async(e)=>{
        e.preventDefault(); 
        if(password.length>=8&&email){
            await signIn(email, password)
            if(isLoggedIn){
                toast.success("Succesed Sign In")
            }else if(isError){
                toast.error("No User Found!")
                setEmail('')
                setPassword('')
            }
        }else{
            toast.error(password.length<=8?"Minimum Pasword is 8 char":"Something wroong in your email")
        }
    }

    const handleSignUp=async(e)=>{
        e.preventDefault();
        if(username.length>=6&&password.length>=8&&email){
            await signUp(email, password, username)
            if(isLoggedIn){
                toast.success("Succesed Sign Up")
            }else if(isError){
                toast.error(error)
            }
        }else{
            toast.error(username.length<6?"Your Name is too short":password.length<8?"Minimum Pasword is 8 char":"something wrong in your email")
        }
    }

    
    return (
        <div className="rounded-lg px-5 py-3 w-full max-w-sm h-[60%]">
            <form onSubmit={action==="sign up"?handleSignUp:handleSignIn}>
                <div className="w-full">
                    {action === "sign up" &&
                        <div className="relative mb-6" data-te-input-wrapper-init>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                minLength={5}
                                className={`${username.length<5?"focus:border-red-500":"focus:border-blue-500"} peer capitalize w-full pb-2 pl-3 bg-transparent border-b-2 text-slate-100 outline-none placeholder:text-white`}
                               placeholder='User Name'
                            />
                            <span className="hidden text-xs text-red-600 peer-invalid:block">username must be 5 characters long</span>
                        </div>
                    }
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className={`w-full pb-2 pl-3 bg-transparent border-b-2 text-slate-100 outline-none placeholder:text-white invalid:border-b-red-600`}
                        id="exampleInput125"
                        placeholder="Email address" />
                </div>
                <div className="relative mb-6" data-te-input-wrapper-init>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        minLength={8}
                        className={`${password.length<8?"focus:border-red-500":"focus:border-blue-500"} peer w-full pb-2 pl-3 bg-transparent border-b-2 text-slate-100 outline-none placeholder:text-white`}
                        id="exampleInput126"
                        placeholder="Password" />
                        <span className="hidden text-xs text-red-600 peer-invalid:block">password must be 8 characters long</span>
                </div>
                <button
                    type="submit"
                    className="w-full block mx-auto bg-slate-700 rounded-lg px-6 pb-2 pt-2.5 mt-10 text-md font-medium uppercase leading-normal text-white shadow-2xl shadow-white/10 transition duration-150 ease-in-out hover:shadow-black/20 hover:bg-slate-800 hover:shadow-lg hover:scale-105 active:bg-slate-800"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    {action === "sign up" ? "Sign up" : "Sign in"}
                </button>
            </form>
            <div className="mt-4">
                {
                    action === "sign up" ?
                        <p className="text-lg text-center text-slate-200 font-semibold">
                            Have an  Account? <Link to={'/sign-in'}><span className="text-red-600 hover:border-b-2  pb-0.5 transition-all duration-200">Sign In</span> </Link>
                        </p>
                        :
                        <p className="text-lg mt-4 text-center text-slate-200 font-semibold">
                            Don &apos; t Have an Account? <Link to={'/sign-up'}><span className="text-red-600 hover:border-b-2  pb-0.5 transition-all duration-200">Sign Up</span> </Link>
                        </p>
                }
            </div>
        </div>
    );
};

FormAuth.propTypes = {
    username: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    setUsername: PropTypes.func,
    setEmail: PropTypes.func,
    setPassword: PropTypes.func,
    action: PropTypes.string,
};

export default FormAuth;
