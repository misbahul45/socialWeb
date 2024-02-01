import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useNotification = create(
    persist(
      (set) => ({
        notification: [],
        addNotification: (value) => {
          set((state) => ({
            notification: [...state.notification, value],
          }));
        },
        removeNotification: (id) => {
          set((state) => ({
            notification: state.notification.filter((notif) => notif.id !== id),
          }));
        },
        removeAllNotifications:(action)=>{
          set((state)=>({
            notification:state.notification.filter((notif)=>!notif.notif.includes(action))
          }))
        }
      }),
     { name:"notification"}
    )
  );
  

export default useNotification;
