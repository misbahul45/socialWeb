
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../../config/firebase"

const getAllBookMarksPosts=async(userId)=>{
    const getsnapShot=await getDocs(collection(db,"posts"))
    const allPosts=getsnapShot.docs.map((doc)=>({
        ...doc.data(),
    }))
    const bookmarkPost=allPosts?.filter((post)=>post.bookmarkUser.includes(userId))
    return bookmarkPost
}

export default getAllBookMarksPosts