import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRoute=create(
    persist((set)=>{
        return{
            route:"/home",
            changeRoute:(value)=>{
                set({route:value})
            }
        }
    },{name:"route"})
)
export default useRoute