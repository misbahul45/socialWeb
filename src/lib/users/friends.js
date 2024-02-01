import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

export const addFriends=async(uid, friendId)=>{
    try{
        await updateDoc(doc(db,"users",uid),{
            friends:arrayUnion({
                friendId,
                isFriend:false
            })
        })
        return true
    }catch(e){
        console.log(e)
      return false
    }
}

export const removeFriends=async(uid, friendId)=>{
    try{
        await updateDoc(doc(db,"users",uid),{
            friends:arrayRemove({
                friendId,
                isFriend:true,
            })
        })
        return true
    }catch(e){
        console.log(e)
      return false
    }
}

export const follbackFriends=async(uid, friendId)=>{
    try{
        await updateDoc(doc(db,"users",friendId),{
            friends:arrayRemove({
                friendId:uid,
                isFriend:false
            })
        })
        await updateDoc(doc(db,"users",friendId),{
            friends:arrayUnion({
                friendId:uid,
                isFriend:true
            })
        })
        await updateDoc(doc(db,"users",uid),{
            friends:arrayUnion({
                friendId,
                isFriend:true,
            })
        })
        return true
    }catch(e){
        console.log(e)
      return false
    }
}

