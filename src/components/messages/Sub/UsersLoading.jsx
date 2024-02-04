const UsersLoading = () => {
  return (
    <>
     {
        Array.from({ length:7 }).map((_,index)=>(
            <div key={index} className={`flex items-center gap-3 py-[2.8px] px-4 w-full bg-slate-900 rounded-md`}>
                <div className="w-9 h-9 bg-slate-500 rounded-full animate-pulse"></div>
                <div className="flex-1 py-2 animate-pulse">
                    <div className="w-[80%] h-4 rounded-lg bg-slate-700"></div>
                    <div className="mt-3 w-full h-5 rounded-md bg-slate-700"></div>
                </div>
            </div>
        ))
     } 
    </>
  )
}

export default UsersLoading
