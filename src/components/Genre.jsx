import React, { useState } from "react";

function Genre({ genre, addGenre, removeGenre }) {
  const [selected, setSelected] = useState(true);

  function handleClick() {
    setSelected(selected ? false : true);
    if (!selected) {
      removeGenre(genre);
    } else {
      addGenre(genre);
    }
  }

  function toggleColor() {
    return selected
      ? "m-2 border-2 rounded-full border-emerald-500 bg-emerald-600 text-gray-900 font-semibold hover:bg-emerald-500 sm:m-2"
      : "m-2 border-2 rounded-full border-emerald-800 bg-emerald-900 text-emerald-100 font-semibold sm:m-2";
  }

  return (
    <div className={toggleColor()} onClick={handleClick}>
      <p className="px-2 py-1 cursor-pointer font-bold text-base sm:px-4 sm:py-2 lg:text-xl">
        {genre}
      </p>
    </div>
  );
}

export default Genre;
