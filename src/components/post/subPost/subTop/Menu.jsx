import PropTypes from 'prop-types'
import { useAuth } from '../../../../store/user'
import useRoute from '../../../../store/route'
import { deletePost } from '../../../../lib/post/deletePost'
import { toast } from "react-toastify"


const Menu = ({ postId , uid, isImage }) => {
    const authorId=useAuth((state)=>state.user.uid)
    const changeRoute=useRoute((state)=>state.changeRoute)

    const handleDeletePost=async()=>{
       try{
        await deletePost(postId, isImage)
       }catch(e){
        toast.error("Something Wrong")
       }
    }

  return (
    <div className="absolute top-0 right-8 flex flex-col md:w-40 sm:w-32 w-24 px-1 md:px-2 py-2.5 bg-slate-600 gap-1.5 rounded-md border border-slate-300 shadow-md shadow-white/20" >
      <button onClick={()=>changeRoute(`/user/${uid}`)} className="py-1 md:text-md text-xs text-slate-200 font-semibold bg-slate-800 hover:bg-slate-900 rounded-md border hover:scale-105 transition-all duration-300" name="to author btn">To Author</button>
      { uid===authorId&&
        <button onClick={handleDeletePost} className="py-1 md:text-md text-xs text-slate-200 font-semibold bg-slate-800 hover:bg-slate-900 rounded-md border hover:scale-105 transition-all duration-300" name="delete">Delete</button>
      }
    </div>
  )
}
Menu.propTypes = {
    postId:PropTypes.string.isRequired,
    uid:PropTypes.string.isRequired,
    isImage:PropTypes.bool,
    setShowMenu:PropTypes.func
}

export default Menu
