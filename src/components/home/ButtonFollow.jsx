import { useMutation } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { addFriends, follbackFriends, removeFriends } from '../../lib/users/friends'
import { useMemo } from 'react'

const ButtonFollow = ({ idFriend, uid, data }) => {
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
            return await removeFriends(uid,idFriend)
          }    
          return await addFriends(uid,idFriend)
        }
      })
      const text=checkFriend==="fallback"?"follback":checkFriend==="followed"?"following":checkFriend===true?"friends":"follow"
  return (
    <button onClick={()=>addFriend.mutate(idFriend)} className={`text-xs px-3 py-1 rounded-md text-slate-100 font-semibold ${checkFriend?"bg-blue-600 hover:bg-blue-800":"bg-red-600 hover:bg-red-700"}  hover:scale-110 transition-all duration-200`}>
        {text}
    </button>
  )
}

ButtonFollow.propTypes = {
    idFriend:PropTypes.string,
    uid:PropTypes.string,
    data:PropTypes.array
}

export default ButtonFollow
