import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

const addNotification=async(idFriend, notification)=>{
    try{
        await updateDoc(doc(db,"users",idFriend),{
            notifications:arrayUnion(notification)
        })
    }catch(e){
        console.log(e)
    }
}

export default addNotification