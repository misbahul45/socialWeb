import { useQuery } from "@tanstack/react-query"
import getAllBookMarksPosts from "../../lib/post/bookmarks/getAllbooksMark"
import { useAuth } from "../../store/user"
import DisplayAllPost from "../../components/home/DisplayAllPost"
import  { useMemo, useState } from "react"
import Menu from "../../components/bookmark/Menu"
import { FaArrowCircleDown } from "react-icons/fa"

const BooksMark = () => {
  const [showFilter, setShowFilter]=useState(false)
  const [filter, setFilter]=useState("")
  const user=useAuth((state)=>state.user)
  const { data:posts, isLoading, isError }=useQuery({
    queryKey:["bookmark posts"],
    queryFn:()=>getAllBookMarksPosts(user.uid),
    refetchInterval:1000,
  })
  const bookmarkPosts=useMemo(()=>{
    if(posts){
      if(filter){
        return posts.filter((post)=>post.releatedContent===filter)
      }
      return posts
    }
  },[filter,posts])
  const dataFilter=useMemo(()=>{
    if(posts){
      return[...new Set(posts.map((post)=>post.releatedContent))]
    }
    return []
  },[posts])

  const handleFilter=()=>{
    setShowFilter(!showFilter)
  }
  
  return (
    <div className="w-full h-full md:pt-0 pt-4">
      <div className="w-full flex items-center gap-4 md:justify-around mb-7">
        <h1 className="lg:text-5xl sm:text-3xl text-xl text-slate-100 font-semibold">Bookmark Posts</h1>
        <div className="relative">
          <button onClick={handleFilter} className="flex justify-center items-center gap-3 lg:w-64 md:w-48 w-32 bg-slate-600 py-1.5 rounded-md text-slate-200 font-serif text-lg capitalize font-semibold ring-[1px] shadow-lg shadow-white/20 ring-slate-100 hover:scale-105 hover:bg-slate-900 transition-all duration-200">
            {
            showFilter?".......":filter?
            <>
               {filter}
              <FaArrowCircleDown className="animate-pulse text-slate-400" />
            </>
            :
            <>
              Posts
              <FaArrowCircleDown className="animate-pulse text-slate-400" />
            </>
            }
          </button>
          {showFilter&&
            <Menu setSelect={setFilter} setShowMenu={setShowFilter} data={dataFilter} />
          }
        </div>
      </div>
      <div className="w-full h-full md:max-w-[70%] block mx-auto mt-9 pb-20 md:pb-7">
          <DisplayAllPost posts={bookmarkPosts} isLoading={isLoading} isError={isError} />
      </div>
    </div>
  )
}

export default BooksMark
