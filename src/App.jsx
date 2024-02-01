import { Routes, Route } from "react-router-dom"
import AuthLayout from "./auth/AuthLayout"
import SignIn from "./auth/form/SignIn"
import SignUp from "./auth/form/SignUp"
import RootLayout from "./root/RootLayout"
import Home from "./root/pages/Home"
import Setting from "./root/pages/Setting"
import Start from "./Index"
import BooksMark from "./root/pages/BooksMark"
import Friends from "./root/pages/Friends"
function App (){
  return (
    <main className="flex h-screen">
        <Routes>
          {/*Public*/}
          <Route element={<AuthLayout />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>
          {/*Private*/}
          <Route element={<RootLayout />}>
            <Route index element={<Start />} />
            <Route path="/home" element={<Home />}>
              <Route path="upload" element={<p>Message</p>} />
              <Route path="post" element={<p>Message</p>} />
              <Route path="post/:id" element={<p>Message</p>} />
            </Route>
            <Route path="/posts" element={<p>Message</p>}/>
            <Route path="/message" element={<p>Message</p>}/>
            <Route path="/friends" element={<Friends />} />
            <Route path="/bookmarks" element={<BooksMark />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/user/:id" element={<p>Hallo</p>} />
          </Route>
        </Routes>
    </main>
  )
}

export default App
