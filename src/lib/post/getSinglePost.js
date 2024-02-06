import { doc, getDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

const getSinglePost=async(idPost)=>{
    try{
        const queryData=await getDoc(doc(db,"posts",idPost))
        const post=queryData.data()
        return post
    }catch(e){
        console.log(e)
    }
}
export default getSinglePost