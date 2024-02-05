import PropTypes from 'prop-types'
import useRoute from '../../../store/route'
import ButtonIcon from '../../ButtonIcon'
import { GoKebabHorizontal } from "react-icons/go";
import Menu from './subTop/Menu';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const SubPostTop = ({ postId, uid, userImage, userName, createAd }) => {
    const [showMenu, setShowMenu]=useState('')
    const changeRoute=useRoute((state)=>state.changeRoute)
    const handleToPersonalUser=()=>{
        changeRoute(`/user/${uid}`)
    }
  return (
    <div className="relative flex justify-between">
        <div onClick={handleToPersonalUser} className="flex cursor-pointer">
            {userImage?
                <img src={userImage} alt='userImage' className="sm:mr-4 mr-2 md:w-9 md:h-9 sm:w-8 sm:h-8 w-7 h-7 rounded-full object-cover" />
                :
                <ButtonIcon  className={'mr-0 md::mr-2 flex items-center gap-3 md:text-4xl text-3xl text-slate-100'}>
                        <FaUserCircle />
                </ButtonIcon>
            }
            <div className="flex-1 flex flex-col">
                <h1 className="md:text-md text-xs text-cyan-600 font-semibold">{userName}</h1>
                <div className="flex gap-2">
                    <span className="text-xs text-slate-700">{createAd.clock}</span>
                    <span className="text-xs text-slate-700">{createAd.date}</span>
                </div>
            </div>
        </div>
        <ButtonIcon onClick={()=>setShowMenu((prev)=>prev===postId?"":postId)} className={'text-2xl text-slate-400 hover:scale-110 hover:text-slate-100 transition-all duration-0'}>
            <GoKebabHorizontal />
        </ButtonIcon>
        {
            showMenu===postId&&
            <Menu setShowMenu={setShowMenu} isImage={userImage?true:false} postId={postId} uid={uid} />
        }
    </div>
  )
}

SubPostTop.propTypes = {
    uid:PropTypes.string.isRequired,
    userImage:PropTypes.string,
    userName:PropTypes.string.isRequired,
    createAd:PropTypes.object.isRequired,
    postId:PropTypes.string.isRequired
}

export default SubPostTop
