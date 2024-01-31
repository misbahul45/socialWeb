import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const addFriends=async(uid, friendId)=>{
    try{
        await updateDoc(doc(db,"users",uid),{
            friends:arrayUnion(friendId)
        })
        return true
    }catch(e){
        console.log(e)
      return false
    }
}


