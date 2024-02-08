import { Outlet } from "react-router-dom"
import FormStoryHome from "../../components/home/Sub/FormStoryHome"
import { useQuery } from "@tanstack/react-query"
import { getAllPost } from "../../lib/post/getAllPost"
import ReleatedContents from "../../components/home/Sub/ReleatedContents"
import Users from "../../components/Users"
import { useAuth } from "../../store/user"
import useRoute from "../../store/route"
import ButtonIcon from "../../components/ButtonIcon"
import { MdClose } from "react-icons/md"
import DisplayAllPost from "../../components/home/Main/DisplayAllPost"


const Home = () => {
  const changeRoute=useRoute(state=>state.changeRoute)
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
    <div className="min-h-screen w-full flex pb-20 lg:pb-5 px-2 md:px-0 pt-4">
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
      <div className={`${route!=="/home"?"bg-black/90 px-32 z-10 md:pt-20 pt-12 scale-100 translate-y-0":"-z-10 scale-0 -translate-y-[200%]"} transition-all duration-700 rounded-lg h-screen w-full fixed left-0 top-0`}>
        <div className="relative w-full block mx-auto">
          <ButtonIcon onClick={()=>changeRoute('/home')} className={'text-4xl absolute top-2 right-2 text-slate-100 hover:bg-red-600 hover:scale-105 transition-all duration-300'}>
            <MdClose />
          </ButtonIcon>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Home
