import React, {useState} from 'react';

function Genre({genre, addGenre, removeGenre}) {
    const [selected, setSelected] = useState(true);

    function handleClick() {
        setSelected(selected ? false : true);
        if(!selected) {
            removeGenre(genre);
        } else {
            addGenre(genre);
        }
    }

    function toggleColor() {
        return selected ? 'm-2 border-2 rounded-full border-emerald-500 bg-emerald-600 text-gray-900 font-semibold hover:bg-emerald-500' : 'm-2 border-2 rounded-full border-emerald-800 bg-emerald-900 text-emerald-100 font-semibold'
    }

    return(
        <div className='flex text-emerald-500' onClick={handleClick}>
           <div className='flex items-center gap-x-2'>
            <input id={genre} type='checkbox' className='rounded
                          border-gray-300
                          text-emerald-600
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-offset-0
                          focus:ring-indigo-200
                          focus:ring-opacity-50 w-5 h-5' />
            <label forhtml={genre} className="text-2xl font-semibold">{genre}</label>
           </div>
        </div>
    );
}

export default Genre;