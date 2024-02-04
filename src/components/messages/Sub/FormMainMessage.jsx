import { useReducer, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import ButtonIcon from '../../ButtonIcon';
import { FaPaperPlane } from 'react-icons/fa';
import { FaRegImage } from 'react-icons/fa6';
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
    const [files, setFiles]=useState([])
    const uid=useAuth(state=>state.user.uid)
    const imageRef=useRef(null)
    const [state, dispatch]=useReducer(componentReducer, { emoji:false, })
    const [message, setMessage]=useState('')

    const handleAddMessages=async(e)=>{
            e.preventDefault()
            const id=nanoid()
            if(message!==""){
                await addMessages(uid,idFriend,{
                    id,
                    uid,
                    message,
                    createAt:new Date().toISOString()
                })
                mainRef.current.scrollTop = mainRef.current.scrollHeight;
                refetchMessage()
            }
        setMessage('')
    }

    const handleGetFile=(e)=>{
        const files = e.target.files;
        if (files) {
            const readFile = new FileReader();
            Array.from(files).forEach((file)=>{
                readFile.onload = (event) => {
                    const fileData = event.target.result;
                    console.log(file.type)
                    if(file.type.includes('video')|| file.type.includes('image')){
                        setFiles((prev) => [...prev, { data: fileData, type: file.type }]);
                    }
                };
                readFile.readAsDataURL(file);
            })
        }
    }
   const handleRemoveFile=(CancelFile)=>{
        setFiles(prev=>prev.filter((file)=>file!==CancelFile))
   }
  return (
    <div className="relative">
        <form onSubmit={handleAddMessages} className="relative flex w-full py-2">
            <input value={message} onChange={(e)=>setMessage(e.target.value)}  className="pt-2 pb-1.5 lg:text-lg w-full rounded-full pl-12 pr-28 text-slate-200 bg-transparent border border-slate-700 outline-none" />
            <ButtonIcon type={'button'}  onClick={()=>dispatch({ type:"emoji" })} className={`absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-green-500`}>
                <MdOutlineEmojiEmotions />
            </ButtonIcon>
            <div className="flex gap-3 absolute right-4 top-1/2 -translate-y-1/2">
                <ButtonIcon type={'button'} onClick={()=>imageRef.current.click()} className={'text-lg text-slate-300 hover:scale-105 transition-all duration-300'}>
                    <FaRegImage />
                </ButtonIcon>
                <ButtonIcon type={'submit'} className={'text-lg text-slate-300 hover:scale-105 transition-all duration-300'}>
                    <FaPaperPlane />
                </ButtonIcon>
            </div>
        </form>
        <div className={`${state.emoji?"opacity-100 bottom-[100%] z-20":"opacity-0 -bottom-32 -z-10"} absolute left-0 lg:w-64 transition-all duration-500`}>
            <ListAllEmoji setText={setMessage} />
        </div>
        <input onChange={handleGetFile} ref={imageRef} type="file" className="scale-0 absolute right-0 top-0 -z-10" />
        <div className="absolute w-2/3 z-20 left-0 bottom-full">
            <div className="w-full flex gap-4 max-h-72 overflow-x-auto">
                {
                    files.map((file, index) => (
                        <div className="relative" key={index}>
                            <ButtonIcon onClick={()=>handleRemoveFile(file)} className={'absolute right-2 top-2 text-3xl text-slate-100 z-10 cursor-pointer px-0.5 py-1 bg-red-500 rounded-md hover:bg-white hover:text-red-700 hover:scale-105 transition-all duration-300'}>
                                <AiFillDelete />
                            </ButtonIcon>
                            <div className="w-full h-full">
                                {file.type.includes('video') ? (
                                    <video src={file.data} controls></video>
                                ) : (
                                    <img className="w-full object-cover" src={file.data} alt="" />
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>
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
