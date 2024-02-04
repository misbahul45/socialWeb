import { Link, useParams } from "react-router-dom"
import FormMainMessage from "../Sub/FormMainMessage"
import { useQuery } from "@tanstack/react-query"
import { getMessages } from "../../../lib/users/Messages"
import { useAuth } from "../../../store/user"
import { useEffect, useMemo, useRef } from "react"
const MainMessages = () => {
    const mainRef=useRef(null)
    const { id:idFriend }=useParams()
    const uid=useAuth(state=>state.user.uid)
    const { data, isLoading, refetch}=useQuery({
      queryKey:[idFriend],
      queryFn:async()=>{
        const data=await getMessages(uid,idFriend)
        if(data===undefined){
          return []
        }
          return data
      },
    })


    const messages = useMemo(() => {
      if (!isLoading) {
        if(data===undefined){
          return []
        }
        return data?.sort((a, b) => {
          const createAtComparison = new Date(a.createAt) - new Date(b.createAt);
          if (createAtComparison === 0) {
            return a.uid === uid ? -1 : 1;
          }
          return createAtComparison;
        });
      }
    }, [data, isLoading, uid]);

    useEffect(() => {
      if (mainRef.current) {
          mainRef.current.scrollTop = mainRef.current.scrollHeight;
      }
    }, [isLoading]);


  return (
    <div className="w-full h-full flex flex-col overflow-y-hidden">
        <div ref={mainRef} className="flex-1 bg-slate-800 pb-2 pt-4 overflow-auto rounded-xl px-12 transition-all scroll-smooth">
        {
          !messages?
          <h1 className="text-4xl text-slate-700 animate-pulse">Loading....</h1>
          :
            messages?.map((message)=>(
              <div className={`${message.uid===uid?"justify-end":"justify-start"} flex items-center mb-2`} key={message.id}>
                {!message.message.includes("http")?
                    <p className={`${message.uid===uid?'bg-blue-700':'bg-purple-600'} text-slate-200 px-2 py-1 rounded-md`}>{message.message}</p>  
                  :
                    <Link className="text-slate-100 px-6 pt-1 pb-2 my-2 bg-red-600 hover:bg-red-800 hover:text-blue-100 transition-all duration-200 rounded-lg" to={message.message}>{message.message}</Link>
                }
              </div>
            ))     
        }
        </div>
        <FormMainMessage refetchMessage={refetch} mainRef={mainRef} idFriend={idFriend} />
    </div>
  )
}

export default MainMessages
