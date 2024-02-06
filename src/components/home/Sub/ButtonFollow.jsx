import { useMutation } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { addFriends, follbackFriends, removeFollowing, removeFriends } from '../../../lib/users/friends'
import { useMemo } from 'react'
import ButtonIcon from '../../ButtonIcon'
import { FaFacebookMessenger } from 'react-icons/fa'
import useRoute from '../../../store/route'

const ButtonFollow = ({ idFriend, uid, data }) => {
  const changeRoute=useRoute(state=>state.changeRoute)
    const checkFriend=useMemo(()=>{
      const findFollow=data.find((data)=>data.uid===idFriend).friends?.find((data)=>data.friendId===uid && data.isFriend===false)
      const userFollowed=data.find((data)=>data.uid===uid).friends?.find((data)=>data.friendId===idFriend && data.isFriend===false)
      if(findFollow){
        return "fallback"
      }else if(userFollowed){
        return "followed"
      }
      return data.find((data)=>data.uid===uid).friends?.find((data)=>data.friendId===idFriend)?.isFriend===true && data.find((data)=>data.uid===idFriend).friends?.find((data)=>data.friendId===uid)?.isFriend===true
    },[uid,idFriend, data])
    
    const addFriend=useMutation({
        mutationKey:["add friends"],
        mutationFn:async(idFriend)=>{
          if(checkFriend==="fallback"){
            return await follbackFriends(uid,idFriend) 
          }else if(checkFriend || checkFriend==="followed"){
              if(checkFriend==="followed"){
                return await removeFollowing(uid,idFriend)
              }
               return await removeFriends(uid,idFriend)

          }else{
            return await addFriends(uid,idFriend)
          } 
       }
      })
      const text=checkFriend==="fallback"?"follback":checkFriend==="followed"?"following":checkFriend===true?"friends":"follow"
      const handleToMessage=()=>{
        changeRoute(`/messages/message/${idFriend}`)
      }
  return (
    <div className="flex gap-4 items-center">
      <button onClick={()=>addFriend.mutate(idFriend)} className={`text-xs px-3 py-1 rounded-md text-slate-100 font-semibold ${checkFriend==="fallback"?"bg-purple-700 hover:bg-purple-800":checkFriend==="followed"?"bg-green-800 hover:bg-orange-800":checkFriend?"bg-blue-600 hover:bg-blue-800":"bg-red-600 hover:bg-red-700"}  hover:scale-110 transition-all duration-200`}>
          {text}
      </button>
      {
        checkFriend===true&&
      <ButtonIcon onClick={handleToMessage} className={'relative text-2xl text-slate-300 group'} textClassName={'opacity-0 absolute -top-8 -left-3 text-xs py-1 px-2 bg-blue-800 rounded-md group-hover:opacity-100'} text={'message'}>
        <FaFacebookMessenger />
      </ButtonIcon>
      }
    </div>
  )
}

ButtonFollow.propTypes = {
    idFriend:PropTypes.string,
    uid:PropTypes.string,
    data:PropTypes.array
}

export default ButtonFollow
