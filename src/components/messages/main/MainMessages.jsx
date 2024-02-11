import { Link, useParams } from "react-router-dom"
import FormMainMessage from "../Sub/FormMainMessage"
import { useQuery } from "@tanstack/react-query"
import { getMessages } from "../../../lib/users/Messages"
import { useAuth } from "../../../store/user"
import { useEffect, useMemo, useRef } from "react"
import ButtonIcon from "../../ButtonIcon"
import { FaArrowLeft, FaUserCircle } from "react-icons/fa"
import { getSingleUser } from "../../../lib/users/users"
import useRoute from "../../../store/route"
const MainMessages = () => {
  const changeRoute=useRoute((state)=>state.changeRoute)
    const mainRef=useRef(null)
    const { id:idFriend }=useParams()
    const imageUid=useAuth(state=>state.user.photoURL)
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
    
    const { data:dataFriend }=useQuery({
      queryKey:["friendImage"],
      queryFn:()=>getSingleUser(idFriend)
    })


  return (
    <div className="w-full h-full flex flex-col overflow-y-hidden md:py-0 pt-16">
        <div className="md:hidden flex items-center gap-2 pl-4 fixed top-0 left-0 h-16 w-full bg-purple-800 rounded-b-lg">
          <ButtonIcon onClick={()=>changeRoute('/messages')} className={'text-2xl text-slate-300'}>
            <FaArrowLeft />
          </ButtonIcon>
          {
            dataFriend?.image?
              <img className="lg:w-12 lg:h-12 w-10 h-10 rounded-full" src={dataFriend.image} alt="" />
              :
              <ButtonIcon className={'mr-0 md::mr-2 flex items-center justify-center gap-3 text-3xl text-slate-100'}>
                <FaUserCircle />
              </ButtonIcon>
          }
          <h1 className="text-2xl font-semibold text-slate-100">{dataFriend?.displayName}</h1>
        </div>
        <div ref={mainRef} className="flex-1 bg-slate-800 pb-2 pt-4 overflow-auto rounded-xl px-12 transition-all scroll-smooth">
        {
          !messages?
          <h1 className="text-4xl text-slate-700 animate-pulse">Loading....</h1>
          :
            messages?.map((message)=>(
              <div className={`${message.uid===uid?"justify-end":"justify-start"} flex items-center mb-1`} key={message.id}>
                <div className={`flex items-center ${message.uid===uid?"flex-row-reverse":""} gap-2`}>
                  <div className={`flex ${message.uid===uid?"justify-end":"justify-start"} lg:mb-7 mb-3`}>
                    <div className={message.uid===uid?'block':'hidden'}>
                      {
                        imageUid?
                        <img className="lg:w-9 lg:h-9 w-5 h-5 rounded-full" src={imageUid} alt="" />
                        :
                        <ButtonIcon className={'mr-0 md::mr-2 flex items-center justify-center gap-3 md:text-2xl text-md text-slate-100'}>
                          <FaUserCircle />
                        </ButtonIcon>
                      }
                    </div>
                    <div className={message.uid===idFriend?'block':'hidden'}>
                      {
                        dataFriend?.image?
                        <img className="lg:w-9 lg:h-9 w-5 h-5 rounded-full" src={dataFriend.image} alt="" />
                        :
                        <ButtonIcon className={'mr-0 md::mr-2 flex items-center justify-center gap-3 md:text-2xl text-md text-slate-100'}>
                          <FaUserCircle />
                        </ButtonIcon>
                      }
                    </div>
                  </div>
                  {!message.message.includes("http")?
                      <p className={`${message.uid===uid?'bg-blue-700':'bg-purple-600'} flex-1 md:text-md sm:text-sm text-xs text-slate-200 px-2 py-1 rounded-md`}>{message.message}</p>  
                    :
                      <Link className="text-slate-100 px-6 pt-1 pb-2 my-2 bg-red-600 hover:bg-red-800 hover:text-blue-100 transition-all duration-200 rounded-lg" to={message.message}>{message.message}</Link>
                  }
                </div>
              </div>
            ))     
        }
        </div>
        <FormMainMessage refetchMessage={refetch} mainRef={mainRef} idFriend={idFriend} />
    </div>
  )
}

export default MainMessages
