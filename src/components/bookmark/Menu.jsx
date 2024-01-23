import PropTypes from 'prop-types'

const Menu = ({ data, setSelect, setShowMenu }) => {
    const handleButton=(value)=>{
        setShowMenu(prev=>!prev)
        setSelect(value)
    }
  return (
    <div className="absolute top-[120%] left-1/2 -translate-x-1/2 md:translate-x-0  md:left-0 lg:w-64 w-40 flex flex-col bg-gradient-to-br from-slate-600 to-slate-950 rounded-md border-x z-20 animate-gradient">
            <button name={'posts'} onClick={()=>handleButton('')} className={`py-1.5 rounded-t-md text-lg text-slate-100 font-serif font-semibold capitalize hover:bg-gradient-to-l hover:from-slate-800 hover:to-slate-900 transition-all duration-300`}>Posts</button>
      {
        data&&
         data.map((data,index)=>(
            <button name={data} onClick={()=>handleButton(data)} className={`py-1.5 ${index===0?"rounded-t-md":index==(data.length-1)?"rounded-b-md":""} text-lg text-slate-100 font-serif font-semibold capitalize hover:bg-gradient-to-l hover:from-slate-800 hover:to-slate-900 transition-all duration-300`} key={index} value={data}>{data}</button>
         ))
      }
    </div>
  )
}

Menu.propTypes = {
  data:PropTypes.array,
  setSelect:PropTypes.func,
  setShowMenu:PropTypes.func
}

export default Menu
