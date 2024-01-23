import { useState } from "react"
import FormAuth from "./FormAuthentication"
const SignUp = () => {
  const [username,setUsername]=useState('')
  const [password, setPassword]=useState('')
  const [email, setEmail]=useState('')
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center bg-gradient-to-tl from-black/70 to-slate-950">
      <h1 className="text-center text-4xl font-serif font-semibold text-slate-200 mb-4">Join With Us</h1>
      <FormAuth username={username} setUsername={setUsername} password={password} setPassword={setPassword} email={email} setEmail={setEmail} action={'sign up'}  />
    </div>
  )
}

export default SignUp
