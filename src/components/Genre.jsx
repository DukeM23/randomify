import React, {useState} from 'react';

function Genre({genre, addGenre, removeGenre}) {
    const [selected, setSelected] = useState(true);

    function handleClick() {
        // console.log(selected)
        setSelected(selected ? false : true);
        if(!selected) {
            // console.log(`${genre} has been removed`);
            removeGenre(genre)
        } else {
            addGenre(genre);
        }

    }

    function toggleColor() {
        // const button = document.querySelectorAll(".bg-sky-600.border-sky-500");
        // if(button.length === 0) {
        //     setSelected(false)
        // };
        return selected ? 'm-2 border-2 rounded-full border-emerald-500 bg-emerald-600 text-gray-900 font-semibold hover:bg-emerald-500' : 'm-2 border-2 rounded-full border-emerald-800 bg-emerald-900 text-emerald-100 font-semibold'
    }

    return(
        <div className={toggleColor()} onClick={handleClick}>
            <p className='px-4 py-2 text-xs sm:text-lg font-bold cursor-pointer'>{genre}</p>
        </div>
    );
}

export default Genre;