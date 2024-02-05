import { useReducer, useState } from 'react'
import PropTypes from 'prop-types'
import { MdOutlineEmojiEmotions } from "react-icons/md";
import ButtonIcon from '../../ButtonIcon';
import { FaPaperPlane } from 'react-icons/fa';
import ListAllEmoji from '../../post/ListAllEmoji';
import { addMessages } from '../../../lib/users/Messages';
import { useAuth } from '../../../store/user';
import { nanoid } from 'nanoid';


const componentReducer=(state,action)=>{
    switch(action.type){
         case "emoji":
            return {
                ...state,
                emoji:!state.emoji
             }
    }
    return state
}
const FormMainMessage = ({ idFriend, mainRef, refetchMessage }) => {
    const uid=useAuth(state=>state.user.uid)
    const [state, dispatch]=useReducer(componentReducer, { emoji:false, })
    const [message, setMessage]=useState('')

    const handleAddMessages=async(e)=>{
            e.preventDefault()
            if(message!==""){
                await addMessages(uid,idFriend,{
                    id:nanoid(),
                    uid,
                    message,
                    createAt:new Date().toISOString()
                })
                mainRef.current.scrollTop = mainRef.current.scrollHeight;
                refetchMessage()
            }
        setMessage('')
    }
  return (
    <div className="relative">
        <form onSubmit={handleAddMessages} className="relative flex w-full py-2">
            <input value={message} onChange={(e)=>setMessage(e.target.value)}  className="pt-2 pb-1.5 lg:text-lg w-full rounded-full pl-12 pr-28 text-slate-200 bg-transparent border border-slate-700 outline-none" />
            <ButtonIcon type={'button'}  onClick={()=>dispatch({ type:"emoji" })} className={`absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-green-500`}>
                <MdOutlineEmojiEmotions />
            </ButtonIcon>
            <div className="flex gap-3 absolute right-4 top-1/2 -translate-y-1/2">
                <ButtonIcon type={'submit'} className={'text-lg text-slate-300 hover:scale-105 transition-all duration-300'}>
                    <FaPaperPlane />
                </ButtonIcon>
            </div>
        </form>
        <div className={`${state.emoji?"opacity-100 bottom-[100%] z-20":"opacity-0 -bottom-32 -z-10"} absolute left-0 lg:w-64 transition-all duration-500`}>
            <ListAllEmoji setText={setMessage} />
        </div>
    </div>
  )
}

FormMainMessage.propTypes = {
    idFriend:PropTypes.string.isRequired,
    mainRef:PropTypes.object,
    refetchMessage:PropTypes.func
}

export default FormMainMessage
