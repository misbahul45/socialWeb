import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import SubPostTop from './subPost/SubPostTop';
import SubPostBottom from './subPost/SubPostBottom';
import { Link } from 'react-router-dom';

const Post = ({ comments, describe, date, likes, postId, createAd ,  postImage, userImage, userName, uid}) => {
  const [viewMore, setVieMore]=useState(false)

  const textContent=useMemo(()=>{
    if(describe?.length>7){
      return viewMore?describe.slice()
      :describe.slice(0,7)
    }else{
      return describe
    }
  },[viewMore, describe])

  return (
    <div className="w-full px-3 md:px-5 pt-6 pb-3 rounded-md shadow-lg shadow-white/10 border border-slate-600 flex flex-col bg-slate-800 hover:border-slate-200">
      <SubPostTop postId={postId} uid={uid} userName={userName} userImage={userImage} createAd={createAd} />
      {postImage&&
       <div className="mt-2 mb-2">
          <img src={postImage} alt='postImage' className="object-cover lg:w-[80%] block mx-auto"/>
       </div>
      }
      <div className="w-full min-h-auto max-h-[70vh] overflow-y-auto mt-2 mb-1.5">
      {date!==null&&<h1 className="lg:text-3xl sm:text-xl text-lg text-center font-semibold text-slate-100 font-serif my-2">{date}</h1>}
        {
          textContent?.map((content,index)=>(
            content.includes('https')?
            <Link key={index} to={content} className="text-sm text-blue-500">{content}</Link>
            :
            <p key={index} className="text-slate-100 leading-5 tracking-wide mb-2">
              {content}
              {index===textContent.length-1&&
                <button onClick={()=>setVieMore(!viewMore)} className="relative text-sm text-slate-400 hover:scale-105 ml-2 transitial-all duration-200 group">
                      {viewMore?"Hide.......":textContent.length<describe.length?"........ViewMore":""}
                      <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-0 h-[0.2px] rounded-full bg-white group-hover:w-full transition-all duration-200" />
                </button>}
            </p>    
          ))
        }
      </div>
      <SubPostBottom postId={postId} comments={comments} likes={likes} numLikes={likes.length} numComment={comments.length} />
    </div>
  )
}

Post.propTypes = {
  userName:PropTypes.string.isRequired,
  userImage:PropTypes.string,
  postId:PropTypes.string,
  postImage:PropTypes.string,
  comments:PropTypes.array.isRequired,
  describe:PropTypes.array.isRequired,
  date:PropTypes.string,
  createAd:PropTypes.object.isRequired,
  likes:PropTypes.array.isRequired,
  uid:PropTypes.string.isRequired
}

export default Post
