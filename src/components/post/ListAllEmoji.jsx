import { useMemo, useState } from "react";

import PropTypes from 'prop-types';
import { emojis } from "../../store/emojis";

const ListAllEmoji = ({ setText }) => {
    const [searchIcon, setSearchIcon] = useState('');
    const listEmoji = useMemo(() => {
        return emojis.filter((emoji) => emoji.name.includes(searchIcon));
    }, [searchIcon]);
    
    const handleAddEmoji = (code) => {
      const emoji = String.fromCodePoint(parseInt(code, 16));
      setText((prev) => prev + emoji);
  };
  

    return (
        <div className="max-h-48 md:max-h-64 flex flex-col w-full px-4 py-3 bg-gray-800 rounded-lg border-2 shadow-2xl shadow-white/20 z-20">
            <input onChange={(e) => setSearchIcon(e.target.value)} type="text" placeholder="Search" className="pl-2 py-1.5 md:text-md text-sm w-full rounded-md bg-slate-600 ring-2 ring-slate-300 placeholder:text-white text-white outline-none font-serif" />
            <div className="mt-3 flex flex-wrap gap-0.5 overflow-y-scroll scroll-smooth">
                {listEmoji?.map((emoji) => (
                    <button type="button" onClick={() => handleAddEmoji(emoji.code)} key={emoji.id} className="text-xl px-1.5 py-1 rounded-lg hover:bg-slate-700" dangerouslySetInnerHTML={{ __html: String.fromCodePoint(parseInt(emoji.code, 16)) }} />
                ))}
            </div>
        </div>
    );
};

ListAllEmoji.propTypes = {
    setText: PropTypes.func,
};

export default ListAllEmoji;
