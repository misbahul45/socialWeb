import DisplayAllPost from "../../components/home/DisplayAllPost"
import FormStoryHome from "../../components/home/FormStoryHome"
import { useQuery } from "@tanstack/react-query"
import { getAllPost } from "../../lib/post/getAllPost"
import ReleatedContents from "../../components/home/ReleatedContents"
import Users from "../../components/Users"
import { useAuth } from "../../store/user"


const Home = () => {
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
    </div>
  )
}

export default Home
