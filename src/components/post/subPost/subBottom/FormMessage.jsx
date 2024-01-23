import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ButtonIcon from '../../../ButtonIcon'
import { FaArrowUp } from 'react-icons/fa'
import { addComents } from '../../../../lib/post/addAction'
import { toast } from "react-toastify"
import { useAuth } from '../../../../store/user'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import ListAllEmoji from '../../ListAllEmoji'

const FormMessage = ({ postId }) => {
    const [showEmoji,setShowEmoji]=useState(false)
    const [rowMessage, setRowMessage]=useState(2)
    const [descMessage, setDescMessage]=useState([])
    const user=useAuth((state)=>state.user)
    const [message, setMessage]=useState('')

    const handleAddComents=async(e)=>{
        e.preventDefault();
        try{
            if(message!==""){
                const userComments={
                    message:descMessage,
                    uid:user.uid,
                    uImage:user.photoURL,
                    uName:user.displayName,
                }
                await addComents(userComments,postId)
                setMessage('')    
            }else{
                toast.error("Cannot send empty Comments!")
            }
        }catch(e){
            toast.error("Something is wrong !")
        }
    }

    useEffect(()=>{
        const lines=message.split("\n")
        setDescMessage(lines)
        if(lines.length>=2){
            if(lines.length>=5){
                setRowMessage(5)
            }else{
                setRowMessage(lines.length)
            }
        }else{
            setRowMessage(2)
        }
    },[message])

  return (
    <form onSubmit={handleAddComents} className="w-full md:px-2 flex items-center gap-4">
        <div className="flex-1 relative">
            <textarea rows={rowMessage} onChange={(e)=>setMessage(e.target.value)} value={message} type="text" placeholder="Comments...." className="text-sm md:text-md w-full pt-1 resize-none pb-1.5 pl-4 pr-8 bg-transparent ring-1 ring-cyan-400 rounded-md outline-none text-slate-100 placeholder:text-green-300 focus:ring-slate-500 overflow-y-auto" />
            <ButtonIcon onClick={()=>setShowEmoji(!showEmoji)} type={'button'} className={'absolute top-1/2 -translate-y-1/2 right-4 text-xl sm:text-2xl md:text-3xl text-cyan-200 hover:text-orange-600 transition-all duration-300'}>
                <MdOutlineEmojiEmotions />
            </ButtonIcon>
            {showEmoji&&
                <div className="absolute max-w-64 right-0 bottom-16">
                    <ListAllEmoji setText={setMessage} />
                </div>
            }
        </div>
        <ButtonIcon type={'submit'} className="p-2 rounded-full bg-blue-700 text-slate-100 hover:bg-blue-800 hover:scale-105 transition-all duration-200">
            <FaArrowUp />
        </ButtonIcon>
    </form>
  )
}

FormMessage.propTypes = {
    postId:PropTypes.string.isRequired,
}

export default FormMessage
