import { useSearchParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"
import DisplayAllPost from '../../components/home/Main/DisplayAllPost';
import Users from '../../components/Users';
import { getAllPost } from '../../lib/post/getAllPost';
import { useAuth } from '../../store/user';
import { useMemo, useState } from 'react';
import { motion } from "framer-motion"
import ButtonIcon from '../../components/ButtonIcon';
import { FaSearch } from 'react-icons/fa';
const Posts = () => {
    const releatedContents=["all", "life Style", "technology", "social", "news", "productivity","Daily Habits", "code"]
    const uid=useAuth(state=>state.user.uid)
    const [searchParams] = useSearchParams();
    const [searching, setSearching]=useState(searchParams.get('content')||"")
    const { data, isError, isLoading } = useQuery({
        queryKey:["all posts"],
        queryFn:()=>{
          return new Promise((resolve)=>{
            resolve(getAllPost())
          },6000)
        },
      })
    const posts=useMemo(()=>{
        if(data){
            if(!releatedContents.includes(searching)){
              return data.filter((post)=>post.content.some((content)=>content.toLowerCase().includes(searching.toLowerCase())))
            }else{
                if(searching==="all"){
                  return data
                }
                return data.filter((post)=>post.releatedContent===searching)
            }
        }
    }, [searching, data, releatedContents])

    const userReleatedContents=useAuth(state=>state.user.releatedContents).sort()
  return (
    <div className="relative flex gap-4 lg:flex-row flex-col-reverse pt-16 pb-24 sm:pt-0 overflow-hidden">
        <motion.div
        initial={{y:-100, opacity:0.3}}
        animate={{y:0, opacity:1}}
        transition={{duration:1}}
        className={`${releatedContents.includes(searching)?"w-full max-w-2xl block mx-auto":""} flex-1 px-5 md:px-0`}>
            <h1 className="lg:text-5xl text-center my-4 font-semibold text-slate-600 uppercase">Posts</h1>
            <DisplayAllPost posts={posts} isLoading={isLoading} isError={isError} />
       </motion.div>
        {!releatedContents.includes(searching)&&
           <div className="flex-1">
                <h1 className="lg:text-5xl text-center my-4 font-semibold text-slate-600 uppercase">Users</h1>
               <Users uid={uid} action={'search'} search={searching} />
            </div>         
        }
      <form className="w-full flex gap-3 items-center px-2 sm:hidden">
        <input value={searching} onChange={(e)=>setSearching(e.target.value)} type="text" placeholder="search..."  className="flex-1 pl-4 rounded-md bg-slate-700 outline-none pt-1 pb-0.5 text-slate-200 placeholder:capitalize"/>
        <ButtonIcon className="p-2 bg-red-600 text-slate-100 rounded-full">
          <FaSearch />
        </ButtonIcon>
      </form>
      <div className="sm:hidden w-full px-4">
        <div className="absolute top-0 left-0 w-full flex gap-3 pl-3 py-4 pr-6 overflow-auto no-scrollbar">
          {userReleatedContents.map((content) => (
            <button onClick={()=>setSearching(content.content)} className="bg-slate-900 text-sm min-w-28 px-4 py-1.5 rounded-md shadow-md shadow-white/20 text-slate-100 capitalize" key={content.id}>{content.content}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Posts
