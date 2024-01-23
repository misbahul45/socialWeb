import { FaRegComment, FaRegHeart, FaShare } from "react-icons/fa"
import { MdOutlineBookmarkAdd,MdBookmarks } from "react-icons/md";
import ButtonIcon from "../../ButtonIcon"
import PropTypes from 'prop-types'
import { Suspense, useMemo, useState } from "react"
import { useAuth } from "../../../store/user"
import { toast } from "react-toastify"
import { addLikes, sharePost } from "../../../lib/post/addAction"
import Messages from "./subBottom/Messages"
import { useQuery } from "@tanstack/react-query"
import getAllBookMarksPosts from "../../../lib/post/bookmarks/getAllbooksMark";
import addBookMark from "../../../lib/post/bookmarks/AddBooksMark"


const SubPostBottom = ({likes, comments,numComment, numLikes, postId }) => {
    const user=useAuth((state)=>state.user)
    const [showComments, setShowComents]=useState(false)
    const { data:bookmark, isLoading }=useQuery({
        queryKey:["userBookmark"],
        queryFn:()=>getAllBookMarksPosts(user.uid),
        refetchInterval:1000,
    })
    const isComment = useMemo(
        () => comments.map((u) => u.uid).indexOf(user.uid) !== -1,
        [comments, user.uid]
      );
      
      const isLikes = useMemo(
        () => likes.map((u) => u.uid).indexOf(user.uid) !== -1,
        [likes, user.uid]
      );
      
      const isUserBookmark = useMemo(
        () =>
          bookmark?.find((post) => post.postId === postId)?.bookmarkUser.includes(
            user.uid
          ) || false,
        [bookmark, user, postId]
      );
      

    const handleAddLikes=async()=>{
        try{
            const userLike={
                uid:user.uid,
            }
            await addLikes(likes, userLike, postId)
        }catch(e){
            toast.error("Something is wrong !")
        }
    }

    const handleSharePost=async()=>{
        try{
            await sharePost(`/home/post/${postId}`)
            toast.info("Copy link successfully !")
        }catch(e){
            toast.error("Something is wrong !")
        }
    }

    const handleBookmark=async()=>{
        await addBookMark(user.uid, postId)
    }

  return (
    <Suspense fallback={isLoading}>
        <div className="flex flex-col gap-4">
            <div className="w-full flex justify-between md:px-7 px-3 mt-2">
                <div className="flex gap-2 md:gap-3 items-center">
                    <ButtonIcon onClick={handleAddLikes} className={`border border-red-400 md:text-2xl ${isLikes?"bg-red-700 text-slate-100":"text-red-500"} hover:bg-red-700 hover:text-slate-100 sm:p-2 p-1.5 rounded-md transition-all duration-300`}>
                        <FaRegHeart />
                    </ButtonIcon>
                    <span className="flex items-center gap-2 md:text-lg text-sm text-slate-100">{numLikes} <b className="hidden sm:block">comments</b></span>
                </div>
                <div className="flex gap-3 items-center">
                    <ButtonIcon onClick={()=>setShowComents(!showComments)} className={`border border-green-400 md:text-2xl ${isComment?"text-slate-100 bg-green-700":"text-green-500"}  hover:bg-green-700 hover:text-slate-100 sm:p-2 p-1.5 rounded-md transition-all duration-300`}>
                        <FaRegComment />
                    </ButtonIcon>
                    <span className="flex items-center gap-2 md:text-lg text-slate-100">{numComment} <b className="hidden sm:block">comments</b></span>
                </div>
                <div onClick={handleSharePost} className="flex gap-3 items-center">
                    <ButtonIcon className={`border border-blue-400 md:text-2xl text-blue-500 hover:bg-blue-700 hover:text-slate-100 p-1.5 sm:p-2 rounded-md`}>
                        <FaShare />
                    </ButtonIcon>
                    <span className="hidden md:block md:text-lg text-slate-100">Share</span>
                </div>
                <div className="flex gap-3 items-center">
                    <ButtonIcon onClick={handleBookmark} className={`border border-red-600 md:text-2xl text-red-500 hover:bg-red-700 ${isUserBookmark?"bg-red-600 text-slate-100":" text-red-500 hover:bg-red-"} hover:text-slate-100 p-1.5 sm:p-2 rounded-md`}>
                        {isUserBookmark?<MdBookmarks /> : <MdOutlineBookmarkAdd />}
                    </ButtonIcon>
                </div>
            </div>
            {showComments&&
                <Messages postId={postId} comments={comments} numComment={numComment} />
            }
        </div>
    </Suspense>
  )
}

SubPostBottom.propTypes = {
    numComment:PropTypes.number.isRequired,
    numLikes:PropTypes.number.isRequired,
    comments:PropTypes.array.isRequired,
    likes:PropTypes.array.isRequired,
    postId:PropTypes.string.isRequired,
}

export default SubPostBottom

