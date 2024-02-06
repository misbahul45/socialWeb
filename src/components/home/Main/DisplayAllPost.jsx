import Post from "../../post/Post"
import PostLoading from "../../post/PostLoading"
import PropTypes from 'prop-types'

const DisplayAllPost = ({posts, isLoading, isError}) => {
  if(isError){
    return <div>Error</div>
  }
  return (
    <div className="flex flex-col gap-8">
      {isLoading?
        <PostLoading count={7} />
      :
      posts.map((post,i)=>{
        return(
          <Post key={i} uid={post.uid} userName={post.uUserName} userImage={post.uImg} createAd={post.createAd} comments={post.comments} likes={post.likes} postImage={post.postImage} describe={post.content} postId={post.postId} date={post.date} />
        )
      })
      }
      {
        posts?.length===0&&
        <h1 className="text-center mt-40 text-7xl text-slate-800 font-semibold uppercase">No  Posts</h1>
      }
    </div>
  )
}

DisplayAllPost.propTypes = {
  posts:PropTypes.array,
  isLoading:PropTypes.bool,
  isError:PropTypes.bool,
}





export default DisplayAllPost
