import PropTypes from 'prop-types'
const PostLoading = ({count}) => {
  return (
    <>
    {
        Array.from({ length:count  }).map((_, index) => (
         <div key={`loading-${index}`} className="flex flex-col gap-3 w-full h-72 bg-slate-800 px-5 py-3 shadow-2xl shadow-white/10 rounded-lg animate-pulse">
            <div className="w-full bg-slate-700 h-2/3 rounded-md"></div>
            <div className="flex gap-4">
                <div className="bg-gray-700 w-32 h-8 rounded-md"></div>
                <div className="bg-gray-700 w-32 h-8 rounded-md"></div>
            </div>
            <div className="w-full bg-slate-700 h-12 rounded-md"></div>
         </div>
        ))  
    }
    </>
  )
}

PostLoading.propTypes = {
    count:PropTypes.number
}

export default PostLoading
