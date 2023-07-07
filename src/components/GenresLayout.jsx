import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import Genre from "./Genre";

function GenresLayout({ token, setSeedGenre }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
      setSeedGenre(selectedGenres)

      const genreSeeds = async (token) => {
        try {
          const { data } = await axios.get(
            "https://api.spotify.com/v1/recommendations/available-genre-seeds",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setGenres(data.genres);
        } catch (e) {
          console.log(e);
        }
      };

      genreSeeds(token)
  }, [setSeedGenre, selectedGenres, token]);

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
    <div className="flex justify-center flex-wrap ">
      {
        genres.map((genre, index) => {
          return (
            <Genre
              key={index}
              genre={genre}
              addGenre={addGenre}
              removeGenre={removeGenre}
            />
          )
        })
      }
    </div>
  );
}

export default GenresLayout;
