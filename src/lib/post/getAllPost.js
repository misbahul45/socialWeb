import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/firebase"

export const getAllPost=async()=>{
    const getsnapShot=await getDocs(collection(db,"posts"))
    const posts=getsnapShot.docs.map((doc)=>({
        ...doc.data(),
    }))
    return posts
}