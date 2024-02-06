import { useSearchParams } from 'react-router-dom';
import { useQuery } from "@tanstack/react-query"
import DisplayAllPost from '../../components/home/Main/DisplayAllPost';
import Users from '../../components/Users';
import { getAllPost } from '../../lib/post/getAllPost';
import { useAuth } from '../../store/user';
import { useMemo } from 'react';
const Posts = () => {
    const releatedContents=["all", "life Style", "technology", "social", "news", "productivity","Daily Habits", "code"]
    const uid=useAuth(state=>state.user.uid)
    const [searchParams] = useSearchParams();
    const searching=searchParams.get('content')
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
                return data.filter((post)=>post.releatedContent===searching)
            }
        }
    }, [searching, data, releatedContents])

  return (
    <div className="flex gap-4">
        <div className={`${releatedContents.includes(searching)?"w-full max-w-2xl block mx-auto":""} flex-1`}>
            <h1 className="lg:text-5xl text-center my-4 font-semibold text-slate-600 uppercase">Posts</h1>
            <DisplayAllPost posts={posts} isLoading={isLoading} isError={isError} />
       </div>
        {!releatedContents.includes(searching)&&
           <div className="flex-1">
                <h1 className="lg:text-5xl text-center my-4 font-semibold text-slate-600 uppercase">Users</h1>
               <Users uid={uid} action={'search'} search={searching} />
            </div>         
        }
    </div>
  )
}

export default Posts
