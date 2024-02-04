import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

export const getMessages=async(uid,idFriend)=>{
    try{
        const getDataUid=await getDoc(doc(db,"messages", uid))
        const uidMessage=getDataUid.data()
        const getDataidFriend=await getDoc(doc(db,"messages", idFriend))
        const idFriendMessage=getDataidFriend.data()
        if(uidMessage!==undefined && idFriendMessage !== undefined ){
           return uidMessage[idFriend].concat(idFriendMessage[uid] || [])
        }else if(uidMessage!==undefined && idFriendMessage===undefined){
            return uidMessage[idFriend]
        }else if(idFriendMessage!==undefined && uidMessage===undefined){
            return idFriendMessage[uid]
        }
    }catch(e){
        console.log(e)
    }
}

export const addMessages=async(uid,idFriend, value)=>{
    try{
        const getDataUid=await getDoc(doc(db,"messages", uid))
        const uidMessage=getDataUid.data()

        if(!uidMessage){
            return await setDoc(doc(db,"messages",uid),{
                [idFriend]:arrayUnion(value)
            })
        }
        return await updateDoc(doc(db,"messages",uid),{
            [idFriend]:arrayUnion(value)
        })
    }catch(e){
        console.log(e)
    }
}
export const editMessage=async()=>{

}
export const deleteMessage=async()=>{
    
}