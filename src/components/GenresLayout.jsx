import React, { useState } from "react";
import { useEffect } from "react";
import Genre from "./Genre";
import Loader from "./Loader";

function GenresLayout({ genres, formatGenres }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    formatGenres(selectedGenres);
  });

  function addGenre(genre) {
    setSelectedGenres((prevValue) => {
      return [...prevValue, genre];
    });
  }

  function removeGenre(genre) {
    setSelectedGenres((prevValue) => {
      if (prevValue.length === 0) {
        return [];
      }
      return prevValue.filter((value) => {
        return value !== genre;
      });
    });
  }

  return (
    <div className="flex flex-wrap justify-center space-x-1 sm:space-x-4 pt-5 pb-10">
      {genres.length !== 0 ? (
        genres.map((genre, index) => {
          return (
            <Genre
              genre={genre}
              addGenre={addGenre}
              removeGenre={removeGenre}
              key={index}
            />
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default GenresLayout;
