import { collection, doc, getDoc, getDocs } from "firebase/firestore"
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

export const getSingleUser=async(id)=>{
    const queryDataUser=await getDoc(doc(db,"users",id))
    const dataUser=queryDataUser.data()
    const queryDataBio=await getDoc(doc(db,"info_user",id))
    const dataBio=queryDataBio.data()
    return {
        ...dataUser,
        ...dataBio
    }
}