import useRoute from "../../store/route";
import { useAuth } from "../../store/user";
import PropTypes from 'prop-types';

const ReleatedContents = ({ isLoadingPosts }) => {
  const releatedContents = useAuth((state) => state.user.releatedContents);
  const changeRoute=useRoute(state=>state.changeRoute)
  const handleSearchByContent = (content) => {
   changeRoute(`/posts?content=${content}`)
  };

  return (
    <>
        <h1 className="text-center text-2xl italic font-semibold uppercase text-slate-100 mb-3">Content</h1>
        <div className="w-full pt-4 pb-3 pl-7 pr-2 bg-gradient-to-br from-slate-800 to-slate-700  border border-slate-400 rounded-lg ml-6 flex flex-col gap-2 items-start drop-shadow-xl">
          {
            isLoadingPosts ?
              <h1 className="text-3xl text-slate-600 animate-pulse">Loading.....</h1>
              :
              releatedContents.map((content) => (
                <button onClick={() => handleSearchByContent(content.content)} key={content.id} className="text-lg text-slate-200 hover:text-blue-700 hover:scale-105 transition-all duration-300 capitalize">
                  # {content.content}
                </button>
              ))
          }
        </div>
    </>
  );
};

ReleatedContents.propTypes = {
  isLoadingPosts: PropTypes.bool
};

export default ReleatedContents;
