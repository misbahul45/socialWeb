import { useMemo } from "react"

const useNotificationFilter=(notification,)=>{
    const bookmark=useMemo(()=>{
        return notification.filter((notif)=>notif.notif==="bookmark").length
    },[notification] )
    const message=useMemo(()=>{
        return notification.filter((notif)=>notif.notif==="message").length
    },[notification] )
    const friend=useMemo(()=>{
        return notification.filter((notif)=>notif.notif==="friend").length
    },[notification] )
    return { bookmark, message, friend }
}
export default useNotificationFilter