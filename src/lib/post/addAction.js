import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { db } from "../../config/firebase"

export const addLikes=async(likes, userLike, postId)=>{
    const isUserLike=new Set(likes.map((u)=>u.uid)).has(userLike.uid)

    if(isUserLike){
        return await updateDoc(doc(db,"posts",postId),{
            likes:arrayRemove(userLike)
        })
    }else{
        return await updateDoc(doc(db,"posts",postId),{
            likes:arrayUnion(userLike)
        })
    }
}

export const addSubLikesComments=async(likes,userLikes,postId,commentsId)=>{
    const isUserLike=new Set(likes.map((u)=>u.id)).has(userLikes.uid)
    if(isUserLike){
        return await updateDoc(doc(db,"posts",`${postId}/comments/${commentsId}`),{
            likes:arrayRemove(userLikes)
        })
    }else{
        return await updateDoc(doc(db,"posts",`${postId}/comments/${commentsId}`),{
            likes:arrayUnion(userLikes)
        })
    }
}
export const addComents=async(userComents,postId)=>{
    return await updateDoc(doc(db,"posts",postId),{
        comments:arrayUnion(userComents)
    })   
}

export const deleteComments=async(userComents, postId)=>{
    return await updateDoc(doc(db,"posts",postId),{
        comments:arrayRemove(userComents)
    })   
}

export const addSubComments=async()=>{

}

export const  sharePost=async(location)=>{
    const copyPost=`${window.location.origin}${location}`
    try{
        await navigator.clipboard.writeText(copyPost)
    }catch(e){
        console.log(e)
    }
}