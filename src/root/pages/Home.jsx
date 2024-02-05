import { Outlet } from "react-router-dom"
import DisplayAllPost from "../../components/home/DisplayAllPost"
import FormStoryHome from "../../components/home/FormStoryHome"
import { useQuery } from "@tanstack/react-query"
import { getAllPost } from "../../lib/post/getAllPost"
import ReleatedContents from "../../components/home/ReleatedContents"
import Users from "../../components/Users"
import { useAuth } from "../../store/user"
import useRoute from "../../store/route"


const Home = () => {
  const route=useRoute(state=>state.route)
  const uid=useAuth((state)=>state.user.uid)
  const { data:posts, isError, isLoading, refetch } = useQuery({
    queryKey:["all posts"],
    queryFn:()=>{
      return new Promise((resolve)=>{
        resolve(getAllPost())
      },6000)
    },
    refetchInterval:2000
  })
  return (
    <div className="min-h-screen w-full flex pb-20 lg:pb-5">
      <div className="flex-1 flex flex-col gap-6">
        <FormStoryHome refetchPost={refetch} />
        <DisplayAllPost posts={posts} isLoading={isLoading} isError={isError} />
      </div>
      <div className="lg:w-1/3 lg:block hidden">
        <div className="px-7">
          <ReleatedContents  isLoadingPosts={isLoading} />
        </div>
        <div>
          <Users action="random" uid={uid} />
        </div>
      </div>
      <div className={`${route!=="/home"?"bg-black/90 z-10 md:pt-24 pt-12 scale-100 translate-y-0":"-z-10 scale-0 -translate-y-[200%]"} transition-all duration-500  rounded-lg h-full w-full fixed left-0 top-0`}>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
