import { list } from "postcss";
import React, { useState } from "react";
import { useEffect } from "react";
import AttributeSliders from "./AttributeSliders";
import Genre from "./Genre";
import Loader from "./Loader";

function GenresLayout({ genres, setSeedGenre }) {

  const [selectedGenres, setSelectedGenres] = useState([]);

  const [loading, setLoading] = useState(false);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [accousticness, setAccousticness] = useState(0.50);
  const [danceability, setDanceability] = useState(0.50);
  const [energy, setEnergy] = useState(0.50);
  const [instrumentalness, setInstrumentalness] = useState(0.50);
  const [loudness, setLoudness] = useState(0.50);
  const [tempo, setTempo] = useState(0.50);

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
    <div className="">
      {/* <h4 className="flex justify-center">Please select genre(s) you're interested in! </h4> */}
      <div className="flex flex-wrap justify-evenly gap-x-2 gap-y-2 sm:gap-x-3 sm:gap-y-3">
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
    </div>
  );
}

export default GenresLayout;
