import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/firebase"

const getAllUsers=async()=>{
    try{
        const getsnapShot=await getDocs(collection(db,"users"))
        const users=getsnapShot.docs.map((doc)=>({
            ...doc.data(),
        }))
        return users
    }catch(e){
        console.log(e)
    }
}
export default getAllUsers