import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "../../config/firebase"
import { nanoid } from "nanoid"
import { doc, setDoc } from "firebase/firestore";
import { format } from "date-fns"

export const upLoadPost = async (uUserName, date, content, uImg, uid, image, releatedContent) => {
    const postId = nanoid();
    let postImage = "";
    const upload=image?await uploadBytes(ref(storage, `posts/${postId}`), image):false
    if(upload){
        const listImageAll = await listAll(ref(storage, `posts`))
        const image = listImageAll.items.find((img) => img.fullPath === `posts/${postId}`)
        postImage = await getDownloadURL(image)
    }
    await setDoc(doc(db, "posts", postId), {
        postImage: postImage || "",
        date:(date)?.toLocaleString('en-US', { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })||"",
        content,
        uImg,
        uid,
        uUserName,
        postId,
        comments:[],
        likes:[],
        createAd:{
            date:format(new Date(),'yyyy-MM-dd'),
            clock:format(new Date(),'HH:mm:ss')
        },
        releatedContent:releatedContent || "",
        bookmarkUser:[]
    })
}
