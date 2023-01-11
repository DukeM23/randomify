import React, {useState} from 'react';

function Genre({genre, addGenre, removeGenre}) {
    const [selected, setSelected] = useState(true);

    function handleClick() {
        console.log(genre)
        setSelected(selected ? false : true);
        if(!selected) {
            removeGenre(genre);
        } else {
            addGenre(genre);
        }
    }

    function toggleColor() {
        return selected ? 'border-2 rounded-full border-emerald-500 bg-emerald-600 text-gray-900 font-semibold hover:bg-emerald-500' : 'border-2 rounded-full border-emerald-800 bg-emerald-900 text-emerald-100 font-semibold'
    }

    return(
        <div className={toggleColor()} onClick={handleClick}>
            <p className='px-2 py-1 text-sm font-semibold cursor-pointer sm:text-lg lg:text-xl lg:px-3 lg:py-2'>{genre}</p>
        </div>
    );
}

export default Genre;