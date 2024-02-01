import { arrayRemove, doc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

const removeNotification=async(userId, notification)=>{
    try{
        await updateDoc(doc(db,"users",userId),{
            notifications:arrayRemove(notification)
        })
    }catch(e){
        console.log(e)
    }
}
export default removeNotification