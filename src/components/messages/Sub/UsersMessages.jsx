
import PropTypes from 'prop-types'
import useRoute from '../../../store/route'
import ButtonIcon from '../../ButtonIcon'
import { FaUserCircle } from 'react-icons/fa'

const UsersMessages = ({ uImage, uName, uFriendId, isFirstIndex, isLastIndex }) => {
   const changeRoute=useRoute((state)=>state.changeRoute)
   const route=useRoute(state=>state.route)
  return (
    <div onClick={()=>changeRoute(`/messages/message/${uFriendId}`)} className={`${route.includes(uFriendId)?"bg-green-700":"bg-white/5"} flex items-center gap-4 py-2.5 pl-6 cursor-pointer font-semibold hover:bg-green-600 transition-all duration-200 ${isFirstIndex?"rounded-t-lg":isLastIndex?"rounded-b-lg":""}`}>
      {uImage?
        <img className="w-10 h-10 rounded-full" src={uImage} alt="friend user image" />
        :
        <ButtonIcon className={'mr-0 md::mr-2 flex items-center justify-center gap-3 md:text-4xl text-3xl text-slate-100'}>
                <FaUserCircle />
        </ButtonIcon>
      }
      <h1 className="text-lg text-slate-100">{uName}</h1>
    </div>
  )
}

UsersMessages.propTypes = {
    uImage:PropTypes.string.isRequired,
    uName:PropTypes.string.isRequired,
    uFriendId:PropTypes.string.isRequired,
    isFirstIndex:PropTypes.bool,
    isLastIndex:PropTypes.bool
}

export default UsersMessages
