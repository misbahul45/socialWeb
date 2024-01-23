import DisplayAllPost from "../../components/home/DisplayAllPost"
import FormStoryHome from "../../components/home/FormStoryHome"
import { useQuery } from "@tanstack/react-query"
import { getAllPost } from "../../lib/post/getAllPost"


const Home = () => {
  const { data:posts, isError, isLoading } = useQuery({
    queryKey:["all posts"],
    queryFn:()=>{
      return new Promise((resolve)=>{
        resolve(getAllPost())
      },6000)
    },
    refetchInterval:1000,
  })
  return (
    <div className="min-h-screen w-full flex pb-20 lg:pb-5">
      <div className="flex-1 flex flex-col gap-6">
        <FormStoryHome />
        <DisplayAllPost posts={posts} isLoading={isLoading} isError={isError} />
      </div>
      <div className="lg:w-1/3 lg:block hidden">
        <div>

        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Home
