import { list } from "postcss";
import React, { useState } from "react";
import { useEffect } from "react";
import AttributeSliders from "./AttributeSliders";
import Genre from "./Genre";
import Loader from "./Loader";

function GenresLayout({ genres, setSeedGenre }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    setSeedGenre(selectedGenres);
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
    <div className="gap-x-10">
      {/* <h4 className="flex justify-center">Please select genre(s) you're interested in! </h4> */}
      <div className="sm:gap-x-1 sm:gap-y-2">
        <div className="flex justify-center flex-wrap">
          {genres.map((genre, index) => {
            return (
              <Genre
                genre={genre}
                addGenre={addGenre}
                removeGenre={removeGenre}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GenresLayout;
