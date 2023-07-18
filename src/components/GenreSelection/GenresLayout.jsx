import axios from "axios";
import React, { useState, useEffect } from "react";
import Genre from "./Genre";

function GenresLayout({ setSeedGenre }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setSeedGenre(selectedGenres);

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

    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if ((!token || token === "") && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      setTimeout(() => {
        window.alert(
          "You have exceeded the 1 hour activity. Please login again."
        );
        window.localStorage.removeItem("token");
        window.location.reload();
      }, 3600 * 1000);

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    genreSeeds(token);
  }, [selectedGenres]);

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
    <div className="flex justify-center flex-wrap">
      {genres.map((genre, index) => {
        return (
          <Genre
            key={index}
            genre={genre}
            addGenre={addGenre}
            removeGenre={removeGenre}
          />
        );
      })}
    </div>
  );
}

export default GenresLayout;
