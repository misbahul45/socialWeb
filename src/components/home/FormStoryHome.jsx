import { useEffect, useReducer } from 'react';
import Calendar from 'react-calendar';
import { FaImages, FaRegPaperPlane } from 'react-icons/fa';
import { MdEmojiEmotions, MdDateRange } from 'react-icons/md';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { useAuth } from '../../store/user';
import ButtonIcon from '../ButtonIcon';
import ListAllEmoji from '../post/ListAllEmoji';
import { upLoadPost } from '../../lib/post/uploadPost';

const initialState = {
  text: '',
  textRow: 2,
  textPost: [''],
  imgPost: null,
  selectedImage: null,
  datePost: null,
  openEmoji: false,
  openDate: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setText':
      return { ...state, text: action.payload };
    case 'setTextRow':
      return { ...state, textRow: action.payload };
    case 'setTextPost':
      return { ...state, textPost: action.payload };
    case 'setImgPost':
      return { ...state, imgPost: action.payload };
    case 'setSelectedImage':
      return { ...state, selectedImage: action.payload };
    case 'setDatePost':
      return { ...state, datePost: action.payload };
    case 'setOpenEmoji':
      return { ...state, openEmoji: action.payload };
    case 'setOpenDate':
      return { ...state, openDate: action.payload };
    default:
      return state;
  }
};

const FormStoryHome = () => {
  const user = useAuth((state) => state.user);
  const userImage = user.photoURL;
  const uid = user.uid;

  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    text,
    textRow,
    textPost,
    imgPost,
    selectedImage,
    datePost,
    openEmoji,
    openDate,
  } = state;

  useEffect(() => {
    const lines = text.split('\n');
    dispatch({ type: 'setTextPost', payload: lines });
    if (lines.length > 4) {
      dispatch({ type: 'setTextRow', payload: lines.length - 1 });
    } else if (lines.length >= 20) {
      dispatch({ type: 'setTextRow', payload: 20 });
    }
  }, [text]);

  const onChangeHandleCreatePost = (e) => {
    dispatch({ type: 'setText', payload: e.target.value });
  };

  const onKeyDownText = (e) => {
    if (e.key === 'Enter') {
      dispatch({ type: 'setTextRow', payload: textRow + 1 });
    } else if (textPost.length === 1) {
      dispatch({ type: 'setTextRow', payload: 2 });
    }
  };

  const onChangeAddImage = (e) => {
    dispatch({ type: 'setOpenDate', payload: false });
    dispatch({ type: 'setOpenEmoji', payload: false });
    const image = e.target.files[0];
    const readerFile = new FileReader();
    readerFile.onload = () => {
      dispatch({ type: 'setImgPost', payload: readerFile.result });
    };
    readerFile.readAsDataURL(image);
    dispatch({ type: 'setSelectedImage', payload: image });
  };

  const handleOpenDate = () => {
    dispatch({ type: 'setOpenDate', payload: !openDate });
    dispatch({ type: 'setOpenEmoji', payload: false });
  };

  const handleOpenEmoji = () => {
    dispatch({ type: 'setOpenEmoji', payload: !openEmoji });
    dispatch({ type: 'setOpenDate', payload: false });
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (text !== '') {
      await upLoadPost(
        user.displayName,
        datePost,
        textPost,
        userImage,
        uid,
        selectedImage
      );
      dispatch({ type: 'setText', payload: '' });
      dispatch({ type: 'setTextPost', payload: [''] });
      dispatch({ type: 'setImgPost', payload: null });
      dispatch({ type: 'setSelectedImage', payload: null });
      dispatch({ type: 'setDatePost', payload: null });
      dispatch({ type: 'setOpenEmoji', payload: false });
      dispatch({ type: 'setOpenDate', payload: false });
      dispatch({ type: 'setTextRow', payload: 2 });
    }
  };

  return (
    <>
      <form
        onSubmit={handleAddPost}
        className="relative w-full md:pt-5 pt-3 pb-3 md:px-8 px-5 flex gap-1 md:gap-3 bg-slate-700 rounded-lg border-2 border-slate-500 shadow-white/10 shadow-xl"
      >
        <div className="w-full flex flex-col gap-2">
          <textarea
            onChange={onChangeHandleCreatePost}
            onKeyDown={onKeyDownText}
            value={text}
            rows={textRow}
            placeholder="How are You Today?"
            className="resize-none w-full md:px-4 px-2 py-1 bg-transparent text-sm md:text-md text-slate-100 pb-1.5 outline-none placeholder:text-slate-300 placeholder:text-md md:placeholder:text-xl border-b border-slate-500 focus:border-slate-200"
          />
          <div className="relative flex flex-col items-center gap-5">
            {datePost !== null && (
              <h1 className="text-xl font-serif font-semibold text-white">
                {datePost.toLocaleString('en-US', {
                  timeZone: 'UTC',
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </h1>
            )}
            <div className="relative flex justify-center">
              {imgPost !== null && (
                <>
                  <img className="w-[80%]" src={imgPost} alt="" />
                  <ButtonIcon
                    onClick={() => dispatch({ type: 'setImgPost', payload: null })}
                    className={`md:text-3xl text-red-600 absolute ${
                      datePost ? '-top-7 right-10' : 'right-7'
                    } hover:scale-110 transition-all duration-300`}
                  >
                    <IoCloseCircleSharp />
                  </ButtonIcon>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center md:mt-2 pr-2 md:pr-4">
            <div className="w-1/2 relative flex items-center gap-2 md:gap-4">
              <ButtonIcon
                type={'button'}
                className={
                  'relative text-lg md:text-2xl text-slate-100 hover:scale-110 hover:text-orange-500'
                }
              >
                <FaImages />
                <input
                  onChange={onChangeAddImage}
                  type="file"
                  className="absolute top-0 left-0 w-7 h-5 opacity-0"
                />
              </ButtonIcon>
              <ButtonIcon
                onClick={handleOpenEmoji}
                type={'button'}
                className={
                  'relative text-lg md:text-2xl text-slate-100 hover:scale-110 hover:text-orange-500'
                }
              >
                <MdEmojiEmotions />
              </ButtonIcon>
              <ButtonIcon
                onClick={handleOpenDate}
                type={'button'}
                className={
                  'relative text-lg md:text-2xl text-slate-100 hover:scale-110 hover:text-orange-500'
                }
              >
                <MdDateRange />
              </ButtonIcon>
              {openEmoji && (
                <div className="absolute -left-8 top-[160%] w-64 md:h-auto z-20">
                  <ListAllEmoji setText={(text) => dispatch({ type: 'setText', payload: text })} />
                </div>
              )}
              {openDate && (
                <div className="absolute top-8 md:left-0 -left-16 rounded-lg z-20">
                  <Calendar onChange={(date) => dispatch({ type: 'setDatePost', payload: date })} value={datePost} />
                </div>
              )}
            </div>
            <button
              type="submit"
              className={
                'flex items-center justify-center gap-2 bg-blue-600 md:text-md p-2 text-sm rounded-full shadow-md shadow-white/30 text-slate-100 font-semibold hover:bg-red-600 hover:scale-105 hover:ring-2 hover:ring-slate-100 transition-all duration-300'
              }
            >
              <FaRegPaperPlane />
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormStoryHome;
