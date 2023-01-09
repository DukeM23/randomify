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
    <div className="grid grid-cols-4">
      {/* <h4 className="flex justify-center">Please select genre(s) you're interested in! </h4> */}
      <div className="col-span-3 grid grid-cols-4 pb-10 gap-x-1 gap-y-2">
      {
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
      }
      </div>
      <div className="">
        <AttributeSliders />
      </div>
    </div>
  );
}

export default GenresLayout;
