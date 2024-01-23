import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, db, storage } from "../config/firebase";
import { arrayRemove, arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import {  getDownloadURL, listAll, ref } from "firebase/storage";
import { nanoid } from "nanoid";

export const useAuth = create(
  persist((set) => ({
    user: {},
    isLoggedIn: false,
    isError: false,
    error: null,
    userLogout:async()=>{
      await signOut(auth)
      set({
        user: {},
        isLoggedIn: false,
        isError: false,
        error: null,
      })
    },
    userSignUp: async (email, password, username) => {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(response.user, {
          displayName: username,
        });
        await setDoc(doc(db, "info_user", auth.currentUser.uid), {
          bio:'',
          releatedContents:[
            {
              id:nanoid(),
              content:"all"
            }
          ]
        });
        set({
          user:{
            ...response.user,
            releatedContents:[
              {
                id:nanoid(),
                content:"all"
              }
            ]
          },
          isLoggedIn: true,
          isError: false,
          error: null,
        });
      } catch (error) {
        set({
          user: {},
          isLoggedIn: false,
          isError: true,
          error: error.message || "An error occurred during signup.",
        });
      }
    },
    userSignIn:async(email, password)=>{
        try{
            const userCredential=await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const docRef =doc(db, "info_user", user.uid);
            const docSnap = await getDoc(docRef);
            let bio="";
            if(docSnap.exists()){
              bio=docSnap.data()?.bio
            }
            set({
                user:{
                  ...userCredential.user,
                  bio,
                  releatedContents:docSnap.data().releatedContents
                },
                isLoggedIn:true,
                isError:false,
                error:null
            })
        }catch(e){
          console.log(e)
            set({
                user:{},
                isLoggedIn:false,
                isError:true,
                error:e.message
            })
        }  
    },
    changeUserName:async(name)=>{
      try{
        await updateProfile(auth.currentUser, {
          displayName:name,
        });
        set((state)=>{
          return{
            ...state,
            user:{
              ...state.user,
              displayName:name
            }
          }
        })
      }catch(e){
        console.log(e.message)
      }
    },
    changeUserBio:async(bio)=>{
      try{
        await updateDoc(doc(db, "info_user", auth.currentUser.uid), {
          bio,
        });
        set((state)=>{
          return{
            ...state,
            user:{
              ...state.user,
              bio
            }
          }
        })
      }catch(e){
        console.log(e.message)
      }
    },
    changeUserImage: async () => {
      try {
        const imageRef = ref(storage, `userProfile`);
        const listImage = await listAll(imageRef);
        const item = listImage.items.find((item) => item.fullPath === `userProfile/${auth.currentUser.uid}`);
        const imageURL = await getDownloadURL(item);
        await updateProfile(auth.currentUser, {
          photoURL:imageURL,
        });
        set((state) => ({
          ...state,
          user: {
            ...state.user,
            photoURL: imageURL,
          },
        }));
      } catch (e) {
        console.log(e.message);
      }
    },
    addReleatedContents:async(releatedContent)=>{
      try{
        const newReleatedContent={
          id:nanoid(),
          content:releatedContent
        }
        await updateDoc(doc(db, "info_user", auth.currentUser.uid),{
          releatedContents:arrayUnion(newReleatedContent)
        });
        set((state)=>({
          ...state,
          user:{
            ...state.user,
            releatedContents:[...state.user.releatedContents,newReleatedContent]
          }
        }))
      }catch(e){
        console.log(e.message)
      }
    },  
    removeReleatedContents:async(releatedContent)=>{
      try{
        await updateDoc(doc(db, "info_user", auth.currentUser.uid), {
          releatedContents:arrayRemove(releatedContent)
        });
        set((state)=>({
          ...state,
          user:{
            ...state.user,
            releatedContents:state.user.releatedContents.filter((content)=>content.id!==releatedContent.id)
          }
        }))
      }catch(e){
        console.log(e.message)
      }
    }, 
  }),{name:"user-login"})
);
