import { useState } from "react"
import FormAuth from "./FormAuthentication"
const SignIn = () => {
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  console.log(email)
  return (
    <div className="w-full h-full flex flex-col gap-2 items-center justify-center bg-gradient-to-tl from-black/70 to-slate-950">
      <h1 className="text-center text-4xl font-serif font-semibold text-slate-200 mb-4">Sign In</h1>
      <FormAuth password={password} setPassword={setPassword} email={email} setEmail={setEmail}  />
    </div>
  )
}

export default SignIn
