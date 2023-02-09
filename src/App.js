import React, { useEffect, useState } from "react";

import Header from "./components/Header";

import axios from "axios";
import GenresLayout from "./components/GenresLayout";
import Splash from "./components/Splash";
import Footer from "./components/Footer";
import checkPlaylist from "./functions/checkPlaylist";
import checkStatus from "./functions/checkStatus";
import getRecommended from "./functions/getReccomended";
import getUserId from "./functions/getUserId";
import overwritePlaylist from "./functions/overwritePlaylist";
import createPlaylist from "./functions/createPlaylist";
import addTracks from "./functions/addTracks";
import Loader from "./components/Loader";
import ResultTracks from "./components/ResultTracks";
import AttributeSlider from "./components/AttributeSlider";

export const ResultContext = React.createContext();

function App() {
  const CLIENT_ID = "4824b5ae50b14db4b523abf744daed42";
  const REDIRECT_URI = "http://localhost:3000/";
  // const REDIRECT_URI = "https://randomify-silk.vercel.app/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private playlist-modify-public";

  const [token, setToken] = useState("");
  const [artists, setArtists] = useState([]);

  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const [seedGenre, setSeedGenre] = useState("");
  const [availableGenres, setAvailableGenres] = useState([]);
  const [accousticness, setAccousticness] = useState(0.5);
  const [danceability, setDanceability] = useState(0.5);
  const [energy, setEnergy] = useState(0.5);
  const [instrumentalness, setInstrumentalness] = useState(0.5);
  const [loudness, setLoudness] = useState(0.5);
  const [tempo, setTempo] = useState(0.5);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
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
      }, 3600000);

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    genreSeeds(token);

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    const results = document.getElementById("results").classList;
    results.add("hidden");
    window.localStorage.removeItem("token");
    window.location.href = REDIRECT_URI;
  };

  const genreSeeds = async (token) => {
    try {
      const { data, status } = await axios.get(
        "https://api.spotify.com/v1/recommendations/available-genre-seeds",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      checkStatus(status);
      setAvailableGenres(data.genres);
    } catch (e) {
      console.log(e);
    }
  };

  const searchArtists = async (e) => {
    e.preventDefault();

    let query = "";
    let i = 0;
    seedGenre.forEach((genre) => {
      if (i === seedGenre.length - 1) {
        query += genre;
      } else {
        query += `${genre},`;
      }
      i++;
    });

    if (query === "") {
      setArtists([]);
      return false;
    }

    setLoading(true);
    const tracks = await getRecommended(
      token,
      query,
      accousticness,
      danceability,
      energy,
      instrumentalness,
      loudness,
      tempo
    );

    setArtists(tracks);
    setLoading(false);

    const results = document.getElementById("results").classList;
    const sliderId = document.getElementById("customization").classList;
    results.remove("hidden");
    sliderId.add("hidden");
  };

  function handleNext() {
    const genreId = document.getElementById("genre-selector").classList;
    const sliderId = document.getElementById("attribute-slider").classList;
    genreId.add(
      "transition-opacity",
      "duration-500",
      "ease-in-out",
      "opacity-0"
    ); // Fade out animation for #genre-selector
    // Manipulation of CSS doesnt occur until animation is done
    setTimeout(() => {
      genreId.add("hidden"); // Make #genre-selector hidden
      sliderId.remove("opacity-0", "hidden"); // Removes hidden status from #attribute-slider
      sliderId.add(
        "transition-opacity",
        "duration-500",
        "ease-in-out",
        "opacity-100"
      ); // Fade in animation
      genreId.remove(
        "transition-opacity",
        "duration-500",
        "ease-in-out",
        "opacity-0"
      ); // Remove transitions from #genre-selector
      sliderId.remove(
        "transition-opacity",
        "duration-500",
        "ease-in-out",
        "opacity-100"
      ); // Remove transitions from #attrbiute-slider
    }, 400);
  }

  function handleBack() {
    const genreId = document.getElementById("genre-selector").classList;
    const sliderId = document.getElementById("attribute-slider").classList;
    sliderId.add(
      "transition-opacity",
      "duration-500",
      "ease-in-out",
      "opacity-0"
    ); // Fade out for #attribute selector
    setTimeout(() => {
      sliderId.add("hidden"); // Make #attribute hidden
      genreId.remove("hidden"); // Remove hidden status from #genre-selector
      genreId.add(
        "transition-opacity",
        "duration-500",
        "ease-in-out",
        "opacity-100"
      ); // Fade in animation for #genre-selector
      sliderId.remove(
        "transition-opacity",
        "duration-500",
        "ease-in-out",
        "opacity-0"
      ); // Remove transistions from #attribute-slider
      genreId.remove(
        "transition-opacity",
        "duration-500",
        "ease-in-out",
        "opacity-100"
      ); // Remove transitions from #genre-selector
    }, 400);
  }

  function handleRIB() {
    window.location.reload();
  }

  async function handleSave() {
    const userId = await getUserId(token);

    let trackUris = [];
    artists.forEach((track) => {
      let uriString = track.uri;
      trackUris = [...trackUris, uriString];
    });

    const isExist = await checkPlaylist(token);
    setExists(isExist);

    if (isExist) {
      overwritePlaylist(token, trackUris);
    } else {
      const playlistId = await createPlaylist(token, userId);
      addTracks(token, playlistId, trackUris);
    }
  }

  return (
    <div className="flex flex-col overflow-auto h-screen bg-gray-900">
      <Header
        token={token}
        authEndpoint={AUTH_ENDPOINT}
        clientId={CLIENT_ID}
        redirectUri={REDIRECT_URI}
        responseType={RESPONSE_TYPE}
        scope={SCOPE}
        logout={logout}
      />
      {token ? (
        <div className="flex justify-center items-center px-5 mb-auto sm:px-8 xl:px-52 2xl:px-92">
          <form id="customization" onSubmit={searchArtists}>
            <div className="gap-x-0 sm:grid sm:grid-cols-6 sm:gap-x-5 xl:grid-cols-10">
              <div
                id="genre-selector"
                className="pb-5 sm:col-span-4 sm:mx-auto lg:col-span- xl:col-span-7"
              >
                <GenresLayout
                  genres={availableGenres}
                  setSeedGenre={setSeedGenre}
                />
              </div>
              <div className="sm:col-span-2 lg:col-span- xl:col-span-3">
                <div id="attribute-slider" className="sm:sticky sm:top-10">
                  <div className="bg-emerald-600 border-emerald-500 border-2 rounded-2xl">
                    <div className="flex justify-center">
                      <div className="flex flex-col w-full px-10 gap-y-5 my-5 sm:px-5">
                        <AttributeSlider
                          attribute="Acousticness"
                          setSliderVal={setAccousticness}
                        />
                        <AttributeSlider
                          attribute="Danceability"
                          setSliderVal={setDanceability}
                        />
                        <AttributeSlider
                          attribute="Energy"
                          setSliderVal={setEnergy}
                        />
                        <AttributeSlider
                          attribute="Instrumentalness"
                          setSliderVal={setInstrumentalness}
                        />
                        <AttributeSlider
                          attribute="Loudness"
                          setSliderVal={setLoudness}
                        />
                        <AttributeSlider
                          attribute="Tempo"
                          setSliderVal={setTempo}
                        />
                      </div>
                    </div>
                  </div>
                  {seedGenre.length !== 0 && (
                    <div className="flex justify-around font-bold lg:text-xl xl:text-2xl text-gray-900">
                      <button
                        className="border-2 rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 font-bold my-2 px-3 py-2"
                        type={"button"}
                        onClick={handleRIB}
                      >
                        Clear
                      </button>
                      <button
                        className="border-2 rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 font-bold my-2 px-3 py-2"
                        type={"submit"}
                      >
                        {loading ? <Loader /> : "Search"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <Splash
          token={token}
          authEndpoint={AUTH_ENDPOINT}
          clientId={CLIENT_ID}
          redirectUri={REDIRECT_URI}
          responseType={RESPONSE_TYPE}
          scope={SCOPE}
          logout={logout}
        />
      )}

      <ResultContext.Provider
        value={{
          token: token,
          artists: artists,
          exists: exists,
          setExists: setExists,
          handleRIB: handleRIB,
          handleSave: handleSave,
        }}
      >
        <ResultTracks
          token={token}
          artists={artists}
          exists={exists}
          setExists={setExists}
          handleRIB={handleRIB}
          handleSave={handleSave}
        />
      </ResultContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
