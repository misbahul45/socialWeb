import 'react-calendar/dist/Calendar.css';
import { useEffect, useState } from 'react';
import { FaImages, FaRegPaperPlane } from "react-icons/fa";
import { MdEmojiEmotions, MdDateRange } from "react-icons/md";
import { IoCloseCircleSharp } from "react-icons/io5";
import Calendar from 'react-calendar';

import { useAuth } from '../../store/user';
import ButtonIcon from '../ButtonIcon';
import { upLoadPost } from '../../lib/post/uploadPost';
import ListAllEmoji from '../post/ListAllEmoji';
import PropTypes from 'prop-types'

const FormStoryHome = ({ refetchPost }) => {
    const user=useAuth((state)=>state.user)
    const userImage = user.photoURL
    const uid=user.uid;

    const [text, setText] = useState('');
    const [textRow, setTextRow]=useState(2)
    const [textPost, setTextPost] = useState([]);
    const [imgPost, setImgPost] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [datePost, setDatePost] = useState(null);
    const [openEmoji, setOpenEmoji]=useState(false)
    const [openDate, setOpenDate]=useState(false)

    const onChangeHandleCreatePost = (e) => {
        setText(e.target.value);
    };
    const onKeyDownText=(e)=>{
        if(e.key==="Enter"){
            setTextRow((prev)=>prev+1)
        }else if(textPost.length===1){
            setTextRow(2)
        }
    }

    useEffect(() => {
        const lines = text.split('\n');
        setTextPost(lines);
        if(lines.length>4){
            setTextRow(lines.length-1)
        }else if(lines.length>=20){
            setTextRow(20)
        }
    }, [text]);

    const onChangeAddImage = (e) => {
        setOpenDate(false)
        setOpenEmoji(false)
        const image = e.target.files[0];
        const readerFile = new FileReader();
        readerFile.onload = () => {
              setImgPost(readerFile.result);
        };
        readerFile.readAsDataURL(image);
        setSelectedImage(image);
    };

    const handleOpenDate=()=>{
        setOpenDate(!openDate)
        setOpenEmoji(false)
    }
    const handleOpenEmoji=()=>{
        setOpenEmoji(!openEmoji)
        setOpenDate(false)
    }

    const handleAddPost=async(e)=>{
        e.preventDefault()
        if(text!==""){
            await upLoadPost(user.displayName, datePost, textPost, userImage, uid, selectedImage )
            refetchPost()
            setText('')
            setTextPost([''])
            setImgPost(null)
            setSelectedImage(null)
            setDatePost(null)
            setOpenEmoji(false)
            setOpenDate(false)
            setTextRow(2)
        }
    }
    return (
        <>
            <form onSubmit={handleAddPost} className="relative w-full md:pt-5 pt-3 pb-3 md:px-8 px-5 flex gap-1 md:gap-3 bg-slate-700 rounded-lg border-2 border-slate-500 shadow-white/10 shadow-xl">
                <div className="w-full flex flex-col gap-2">
                    <textarea
                        onChange={onChangeHandleCreatePost}
                        onKeyDown={onKeyDownText}
                        value={text}
                        rows={textRow}
                        placeholder="How are You Today?"
                        className="resize-none w-full md:px-4 px-2 py-1 bg-transparent text-sm md:text-md text-slate-100 pb-1.5 outline-none placeholder:text-slate-300 placeholder:text-md md:placeholder:text-xl focus:border-b focus:border-slate-300"
                    />
                    <div className="relative flex flex-col items-center gap-5">
                        {datePost!==null&&
                            <h1 className="text-xl font-serif font-semibold text-white">{(datePost).toLocaleString('en-US', { timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h1>
                        }
                        <div className="relative flex justify-center">
                            {imgPost!==null&&
                                <>
                                  <img className="w-[80%]" src={imgPost} alt="" />
                                  <ButtonIcon onClick={()=>setImgPost(null)} className={`md:text-3xl text-red-600 absolute ${datePost?"-top-7 right-10":"right-7"} hover:scale-110 transition-all duration-300`}>
                                    <IoCloseCircleSharp />
                                  </ButtonIcon>
                                </>
                            }
                        </div>
                    </div>
                    <div className="flex justify-between items-center md:mt-2 pr-2  md:pr-4">
                        <div className="w-1/2 relative flex items-center gap-2 md:gap-4">
                            <ButtonIcon type={'button'} className={'relative text-lg md:text-2xl text-slate-100 hover:scale-110 hover:text-orange-500'}>
                                <FaImages />
                                <input onChange={onChangeAddImage} type="file"  accept="image/png, image/gif, image/jpeg" className="absolute top-0 left-0 w-7 h-5 opacity-0" />
                            </ButtonIcon>
                            <ButtonIcon onClick={handleOpenEmoji} type={'button'} className={'relative text-lg md:text-2xl text-slate-100 hover:scale-110 hover:text-orange-500'}>
                                <MdEmojiEmotions />
                            </ButtonIcon>
                            <ButtonIcon onClick={handleOpenDate} type={'button'} className={'relative text-lg md:text-2xl text-slate-100 hover:scale-110 hover:text-orange-500'}>
                                <MdDateRange />
                            </ButtonIcon>
                            {openEmoji&&
                                <div className="absolute -left-8 top-[160%] w-64 md:h-auto z-10">
                                    <ListAllEmoji setText={setText} />
                                </div>
                            }
                            {openDate&&
                                <div className="absolute top-8 md:left-0 -left-16 rounded-lg z-20">
                                    <Calendar onChange={setDatePost} value={datePost} />
                                </div>
                            }
                        </div>
                        <button type="submit" className={'flex items-center justify-center gap-2 bg-blue-600 md:text-md p-2 text-sm rounded-full shadow-md shadow-white/30 text-slate-100 font-semibold hover:bg-red-600 hover:scale-105 hover:ring-2 hover:ring-slate-100 transition-all duration-300'}>
                            <FaRegPaperPlane />
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

FormStoryHome.propTypes = {
    refetchPost:PropTypes.func
  }

export default FormStoryHome;