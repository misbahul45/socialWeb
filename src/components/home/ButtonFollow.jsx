import { useMutation } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { addFriends } from '../../lib/users/friends'
import { useMemo } from 'react'

const ButtonFollow = ({ idFriend, uid, data }) => {
    const addFriend=useMutation({
        mutationKey:["add friends"],
        mutationFn:async(idFriend)=>{
          return await addFriends(uid,idFriend)
        }
      })

    const checkFriend=useMemo(()=>{
        return data.find((data)=>data.uid===uid).friends?.includes(idFriend)
      },[uid,idFriend, data])


  return (
    <button onClick={()=>addFriend.mutate(idFriend)} className={`text-xs px-3 py-1 rounded-md text-slate-100 font-semibold ${checkFriend?"bg-blue-600 hover:bg-blue-800":"bg-red-600 hover:bg-red-700"}  hover:scale-110 transition-all duration-200`}>
        {checkFriend?"friends":"follow"}
    </button>
  )
}

ButtonFollow.propTypes = {
    idFriend:PropTypes.string,
    uid:PropTypes.string,
    data:PropTypes.array
}

export default ButtonFollow
