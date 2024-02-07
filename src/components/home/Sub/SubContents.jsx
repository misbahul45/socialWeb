import PropTypes from 'prop-types'

const SubContents = ({ setReleatedContent, setOpenContents }) => {
    const contents=["all", "life Style", "technology", "social", "news", "productivity","Daily Habits", "code"]
    const handleAddReleatedContent=(content)=>{
        setReleatedContent(content)
        setOpenContents(prev=>!prev)
    }
  return (
    <ul className="absolute top-[120%] -left-5 bg-slate-700 z-10 rounded-lg border">
        {
            contents.map((content, index)=>(
                <li onClick={()=>handleAddReleatedContent(content)} key={`${index}+_+${content}`} className={`${(index===contents.length-1)&&"rounded-b-lg"} ${index===0&&"rounded-t-lg"} w-48 py-1 text-slate-300 capitalize pl-4 cursor-pointer hover:bg-slate-900 transition-all duration-75`}>{content}</li>
            ))
        }
    </ul>
  )
}

SubContents.propTypes = {
    setReleatedContent:PropTypes.func.isRequired,
    setOpenContents:PropTypes.func.isRequired,
}

export default SubContents
