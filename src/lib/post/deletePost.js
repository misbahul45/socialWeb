import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../config/firebase"

export const deletePost=async(postId)=>{
        return await deleteDoc(doc(db,"posts",postId))
}