import { useQuery } from "@tanstack/react-query"
import { getSingleUser } from "../../lib/users/users"
import { useParams } from "react-router-dom"
import ButtonIcon from "../../components/ButtonIcon"
import { FaUserCircle, FaUserFriends } from "react-icons/fa"
import { useEffect, useMemo, useRef, useState } from "react"
import DisplayAllPost from "../../components/home/Main/DisplayAllPost"
import { getAllPost } from "../../lib/post/getAllPost"
import { CiEdit, CiSignpostDuo1 } from "react-icons/ci";
import { motion } from "framer-motion"
import Users from "../../components/Users"
import { useAuth } from "../../store/user"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { db, storage } from "../../config/firebase"
import { doc, updateDoc } from "firebase/firestore"

const UserAccount = () => {
    const uid=useAuth((state)=>state.user.uid)
    const { id }=useParams()
    const { data:user, isLoading:isLoadingUsers, refetch:refetchUser }=useQuery({
        queryKey:["user"],
        queryFn:()=>getSingleUser(id)
    })
    const { data, refetch:refetchPost}=useQuery({
        queryKey:["users posts"],
        queryFn:getAllPost
    })
    const [showItems, setShowItems]=useState('posts')
    const [bgImage, setBgImage]=useState('')
    const bgRef=useRef(null)
    useEffect(()=>{
        if(id){
            refetchUser()
            refetchPost()
        }
    },[id, refetchUser, refetchPost])
    useEffect(()=>{
        if(user){
            setBgImage(user.bgImage)
        }
    },[user])

    const userPosts=useMemo(()=>{
        if(data){
            return data.filter((post)=>post.uid===id)
        }
    }, [data, id])

    const handleBgImage=async(e)=>{
        const image=e.target.files[0]
        try{
            const imageRef=ref(storage,`userBackground/${user.uid}`)
            await uploadBytes(imageRef,image)
            const listImage = await listAll(ref(storage, 'userBackground'));
            const item = listImage.items.find((item) => item.fullPath === `userBackground/${uid}`);
            const imageURL = await getDownloadURL(item);
            if(imageURL){
                await updateDoc(doc(db,"info_user",uid),{
                    bgImage:imageURL
                })
                setBgImage(imageURL)
            }
        }catch(e){
            console.log("error")
        }
    }

    if(isLoadingUsers){
        return<div>Loading...</div>
    }
  return (
    <main className="w-full flex flex-col pb-7">
      <div className="relative w-full">
        <div className="relative group">
            {
                bgImage?
                    <img className={`w-full h-64 object-cover rounded-md -z-10`} src={bgImage} alt="" />
                :
                    <div className={`w-full h-64 bg-white/30 rounded-md -z-10`}></div>
            }
            {
                user.uid===uid&&
                <ButtonIcon onClick={()=>bgRef.current?.click()} className={'absolute left-4 bottom-3 text-3xl hidden text-slate-700 p-2 rounded-full group-hover:block hover:scale-105 hover:bg-red-600 hover:text-slate-100 transition-all duration-500'}>
                    <CiEdit />
                </ButtonIcon>
            }
            <input onChange={handleBgImage} ref={bgRef} type="file" className="absolute scale-0" />
        </div>
        <div className="absolute right-5 -bottom-9 p-4 rounded-lg bg-slate-700 shadow-xl shadow-white/10">
            {
             user.image?
                <img src={user.image} alt='userImage' className="md:w-16 md:h-16 sm:w-8 sm:h-8 w-7 h-7 rounded-full object-cover drop-shadow-xl" />
             :
                <ButtonIcon className={'mr-0 md::mr-2 flex items-center gap-3 md:text-4xl text-3xl text-slate-100'}>
                        <FaUserCircle/>
                </ButtonIcon>
            }
        </div>
      </div>
      <div className="mt-5 ml-5">
        <h1 className="lg:text-5xl text-slate-600 font-semibold">{user.displayName}</h1>
        <p className="text-slate-400 lg:ml-40 mt-2 text-lg">{user.bio==="No bio"?"":user.bio}</p>
      </div>
      <span className="my-4 w-full h-[1px] bg-slate-200"></span>
      <div className="lg:px-24 md:px-16 sm:px-8 py-2">
            <div className="flex gap-4 justify-center mb-4">
                <ButtonIcon onClick={()=>setShowItems('posts')} className={`text-3xl px-2 py-1.5 text-slate-100 rounded-md shadow-md shadow-white/20 hover:bg-red-600 hover:scale-110 transition-all duration-200 ${showItems==="posts"?"bg-red-600":"bg-blue-600"}`}>
                    <CiSignpostDuo1 />
                </ButtonIcon>
                <ButtonIcon onClick={()=>setShowItems('friends')} className={`text-3xl px-2 py-1.5 text-slate-100 rounded-md shadow-md shadow-white/20 hover:bg-red-600 hover:scale-110 transition-all duration-200 ${showItems==="friends"?"bg-red-600":"bg-blue-600"}`}>
                    <FaUserFriends />
                </ButtonIcon>
            </div>
            <div>
                {showItems==="posts"?
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                      }}
                     className="">
                        <DisplayAllPost posts={userPosts} />
                    </motion.div>
                    :
                    <div>
                        <Users uid={id} action={'followed'} />
                    </div>
                }
            </div>
      </div>
    </main>
  )
}

export default UserAccount
