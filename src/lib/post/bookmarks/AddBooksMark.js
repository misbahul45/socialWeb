import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../../config/firebase"

const addBookMark=async(userId,postId)=>{
    const queryData=await getDoc(doc(db,"posts",postId))
    const bookMarks=await queryData.data().bookmarkUser;

    return bookMarks?.indexOf(userId)===-1?
        await updateDoc(doc(db,"posts",postId),{
            bookmarkUser:arrayUnion(userId)
        })
    :     
    await updateDoc(doc(db,"posts",postId),{
        bookmarkUser:arrayRemove(userId)
    })
}

export default addBookMark