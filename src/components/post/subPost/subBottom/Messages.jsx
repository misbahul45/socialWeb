import PropTypes from 'prop-types'
import FormMessage from "./FormMessage";
import Message from './Message';

const Messages = ({ numComment,comments, postId }) => {
    return (
      <div className="w-full flex flex-col gap-3 justify-between min-h-40 rounded-md md:px-4 pt-1.5 pb-1">
          <div className="w-full overflow-y-auto overflow-x-hidden flex flex-col gap-4">
              {numComment===0?
                  <h1 className="sm:text-2xl md:text-4xl text-lg  mt-4 text-center font-semibold font-serif tracking-wider text-gray-700">No Comments</h1>
              :
                  comments.map((comment, index)=>(
                    <Message key={index} comment={comment} postId={postId} />
                  ))
              }
          </div>
          <FormMessage postId={postId} />
      </div>
    )
  }

Messages.propTypes = {
    numComment:PropTypes.number.isRequired,
    comments:PropTypes.array.isRequired,
    postId:PropTypes.string.isRequired,
}

export default Messages
