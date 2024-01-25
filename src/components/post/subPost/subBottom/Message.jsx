import PropTypes from 'prop-types'
import ButtonIcon from '../../../ButtonIcon'
import { FaUserCircle } from 'react-icons/fa'
import useRoute from '../../../../store/route'
import { useAuth } from '../../../../store/user'
import { deleteComments } from '../../../../lib/post/addAction'
import { toast } from "react-toastify"
import { Link } from 'react-router-dom'
import { MdRemoveCircle } from 'react-icons/md'


const Message = ({ comment, postId }) => {
    const author=useAuth((state)=>state.user)
    const changeRoute=useRoute((state)=>state.changeRoute)

    const  handleDeleteComments=async()=>{
        try{
            await deleteComments(comment, postId)
        }catch(e){
            toast.error("Cannot Delete Comments")
        }
    }




  return (
    <div>
        <div className="w-full">
            <div className="flex justify-between items-center">
                <div onClick={()=>changeRoute(`/user/${comment.uid}`)} className="flex gap-2 items-center hover:cursor-pointer">
                    <div>
                        { comment.uImage?
                            <img className="w-6 h-6 rounded-full" src={comment.uImage}></img>
                            :
                            <ButtonIcon>
                                <FaUserCircle />
                            </ButtonIcon>
                        }
                    </div>
                    <h1 className="text-xs text-slate-400">{comment.uName}</h1>
                </div>
                {
                    author.uid===comment.uid&&
                    <div className="flex gap-3 items-center">
                        <ButtonIcon onClick={handleDeleteComments} className={'text-2xl text-slate-400 hover:scale-110 hover:text-slate-100 transition-all duration-0'}>
                            <MdRemoveCircle />
                        </ButtonIcon>
                    </div>
                }
            </div>
            <div className="pl-5 pr-12 w-full flex justify-between">
               <div>
                {
                        comment.message.map((msg,index)=>(
                            <div key={index}>
                                {msg.includes("https")?
                                    <Link to={msg} className="text-sm text-blue-500">{msg}</Link>
                                    :
                                    <p className="text-sm text-slate-300">{msg}</p>
                                }
                            </div>
                        ))
                    }
               </div>
           </div>
        </div>
    </div>
  )
}

Message.propTypes = {
    comment:PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired,
}

export default Message
