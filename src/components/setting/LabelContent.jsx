import { MdDeleteForever } from "react-icons/md";
import PropTypes from 'prop-types'
import ButtonIcon from "../ButtonIcon";
import { useAuth } from "../../store/user";
import { toast } from "react-toastify"

const LabelContent = ({content, length, edit}) => {
  const removeReleatedContents=useAuth(state=>state.removeReleatedContents)
  const handleDeleteLabel=async()=>{
    length>1 && edit?removeReleatedContents(content):toast.error("cannot delete Contents")
  }
  return (
    <div className={`bg-gray-900 w-auto flex justify-center items-center gap-3 px-4 py-1.5 border border-slate-100 rounded-md shadow-white/15 shadow-lg`}>
        <span className="text-slate-100 capitalize text-sm lg:text-lg">{content.content}</span>
        {edit&&
          <ButtonIcon onClick={handleDeleteLabel} className=" lg:text-xl text-red-600 cursor-pointer hover:scale-110 hover:text-red-600 transition-all duration-300" >
            <MdDeleteForever />
          </ButtonIcon>
        }
    </div>
  )
}

LabelContent.propTypes = {
    content:PropTypes.object, 
    length:PropTypes.number,
    edit:PropTypes.bool,
}

export default LabelContent