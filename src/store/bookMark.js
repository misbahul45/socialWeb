import { create } from "zustand";

const useBookmark=create(
    (set)=>{
        return{
            bookmark:[],
            initialized:false,
            setAllBookmark:(value)=>{
                set({ 
                    bookmark : value,
                    initialized:true
                })
            },
            addBookmark:(valueBookMarks)=>{
                set((state)=>[...state.booksmark,valueBookMarks]
                )
            },
            deleteBookmark:(idPost)=>{
                set((state)=>state.booksmark.filter((post)=>post.id!==idPost))
            }
        }
    }
)
export default useBookmark