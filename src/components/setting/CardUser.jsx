import { FaPlus, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../store/user";
import { useEffect, useMemo, useState } from "react";
import {toast} from "react-toastify"
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../config/firebase";
import LabelContent from "./LabelContent";
import ButtonIcon from "../ButtonIcon";

const CardUser = () => {
  const user = useAuth((state) => state.user);


  const [edit, setEdit] = useState(false);
  const [openReleated,setOpenReleated]=useState(false)
  const [username, setUsername] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio || "No bio");
  const [image, setImage] = useState(user.photoURL||null);
  const [releatedContents, setReleatedContents]=useState(user.releatedContents)

  const changeUserName=useAuth(state=>state.changeUserName);
  const changeUserBio=useAuth(state=>state.changeUserBio)
  const changeUserProfile=useAuth(state=>state.changeUserImage)
  const addReleatedContents=useAuth(state=>state.addReleatedContents)


  const handleEdit = async() => {
    setEdit(!edit);
    setOpenReleated(false)
    if(edit){
        await changeUserName(username);
        await changeUserBio(bio)
        await changeUserProfile()

        toast.success("succes update")
    }
  };

  const handleImageChange = async(e) => {
    if (e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedImage);
      const imageRef=ref(storage,`userProfile/${user.uid}`)
      await uploadBytes(imageRef,selectedImage )
    }
  };

  const handleAddReleatedContents=async(content)=>{
    await addReleatedContents(content)
  }

  const releatedContentMenu = useMemo(
    () =>
      ["all", "lifeStyle", "technology", "social", "news", "prodctivity","Daily Habits", "code"].filter(
        (item) => !releatedContents?.some((selected) => selected.content === item),
        [user]
      ),
    [releatedContents, user]
  );

  useEffect(()=>{
    if(user){
      setReleatedContents(user.releatedContents)
    }
  },[user])

  return (
    <div className="rounded-lg border-2 relative xl:w-full xl:max-w-2xl w-full px-7 pt-5 pb-9 bg-slate-700">
      <div className="flex flex-col md:flex-row gap-4 md:pb-0 pb-3 md:gap-2 items-center relative">
        <div className="">
          {image ? (
              <div className="w-auto rounded-full border-2">
                <img className="w-12 h-12 rounded-full" src={image} alt="" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                  <div className="cursor-pointer relative">
                      <div>
                          <FaUserCircle className="text-5xl text-slate-100" />
                      </div>
                </div>
              </div>
            )}
        </div>
        <input
          disabled={!edit ? true : false}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={`${edit?"ring-2 outline-none ring-slate-200 bg-slate-950":"bg-gray-950 cursor-not-allowed"} flex-1 pl-3 py-1.5 rounded-md text-xl font-semibold text-slate-100`}
        />
        {edit && (
        <input
          onChange={handleImageChange}
          className="absolute top-2 left-0 w-10 cursor-pointer opacity-0 "
          type="file"
       />
            )}
      </div>
      <textarea
        disabled={!edit ? true : false}
        value={bio}
        onChange={(e) => setBio(e.target.value)}
          className={`${edit?"ring-2 ring-slate-200 bg-slate-950":"cursor-not-allowed bg-gray-950"} rounded-lg py-1.5 pl-2 outline-none resize-none w-full bg-transparent text-slate-200 mt-2 first-letter:capitalize`}
      />
      <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold font-serif text-slate-200">Releated Content</h2>
            <ButtonIcon onClick={()=>setOpenReleated(edit?!openReleated:openReleated)} className={'text-slate-50 text-lg hover:text-slate-900 hover:scale-125 transition-all duration-300'}>
              <FaPlus />
            </ButtonIcon>
          </div>
          <div className="flex gap-2 w-[95%] flex-wrap mb-4 mt-1">
            {
              openReleated&&
                releatedContentMenu?.map((content,index)=>(
                  <button key={index} onClick={()=>handleAddReleatedContents(content)} className="px-3 py-1.5 rounded-lg border-2 bg-blue-700 text-white shadow-lg shadow-white/20 hover:bg-blue-900 hover:scale-105 transition-all duration-300">
                    {content}
                  </button>
                ))
            }
          </div> 
      </div>
      <div className="flex">
        <div className="flex mt-2 gap-2 lg:gap-3 flex-1 flex-wrap">
              {
                releatedContents?.map((content)=>(
                  <LabelContent key={content.id} content={content} length={releatedContents.length} edit={edit} />
                ))
              }
        </div>
        <button
          onClick={handleEdit}
          className={`${edit ? "bg-red-600 hover:bg-red-800" : "bg-blue-700 hover:bg-blue-800"} absolute bottom-2 right-5 px-5 lg:px-6 py-1.5 lg:py-2 text-sm lg:text-md border rounded-md shadow-lg shadow-black/40 font-semibold text-slate-100 hover:scale-105 transition-all duration-200`}>
          {edit ? "Save" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default CardUser;
