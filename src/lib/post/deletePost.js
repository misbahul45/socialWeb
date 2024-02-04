import { ref, deleteObject } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore"
import { db, storage } from "../../config/firebase"

export const deletePost=async(postId, isImage)=>{
        try{
           await deleteDoc(doc(db,"posts",postId))
           if(isImage){
             await deleteObject(ref(storage,`posts/${postId}`))
           }
           return true
        }catch(e){
                console.log(e.error)
        }
}