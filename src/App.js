import React, {useEffect, useState} from "react";

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
import Genre from "./components/Genre";

export const ResultContext = React.createContext();
export const APIContext = React.createContext();

function App() {
  const CLIENT_ID = "4824b5ae50b14db4b523abf744daed42";
  const REDIRECT_URI = "http://localhost:3000/";
  // const REDIRECT_URI = "https://randomify-silk.vercel.app/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private playlist-modify-public";

  const [token, setToken] = useState("");
  const [artists, setArtists] = useState([])

  const [exists, setExists] = useState(false);
  const [loading, setLoading] = useState(false);

  const [seedGenre, setSeedGenre] = useState("");
  const [availableGenres, setAvailableGenres] = useState([]);
  const [accousticness, setAccousticness] = useState(0.50);
  const [danceability, setDanceability] = useState(0.50);
  const [energy, setEnergy] = useState(0.50);
  const [instrumentalness, setInstrumentalness] = useState(0.50);
  const [loudness, setLoudness] = useState(0.50);
  const [tempo, setTempo] = useState(0.50);

  const [orderedGenres, setOrderedGenres] = useState([]);
  
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if(!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      
      setTimeout(() => {
        window.alert("You have exceeded the 1 hour activity. Please login again.");
        window.localStorage.removeItem("token");
        window.location.reload();
      }, 3600000)
      
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
  }

  const genreSeeds = async (token) => {
    try {
      const {data, status} = await axios.get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });

      checkStatus(status);
      setAvailableGenres(data.genres);
      
    } catch (e) {
      console.log(e);
    }
  }

  const searchArtists = async (e) => {
    e.preventDefault()

    let query = "";
    let i = 0
    seedGenre.forEach(genre => {
      if(i === seedGenre.length-1) {
        query += genre;
      } else {
        query += `${genre},`
      }
      i++;
    });

    if(query === "") {
      setArtists([]);
      return false;
    }

    setLoading(true);
    const tracks = await getRecommended(token, query, accousticness, danceability, energy, instrumentalness, loudness, tempo);

    setArtists(tracks);
    setLoading(false);

    const results = document.getElementById("results").classList;
    const genreId = document.getElementById("genre-selector").classList;
    results.remove("hidden");
    genreId.add("hidden");
  } 

  function handleNext() {
    const genreId = document.getElementById("genre-selector").classList;
    const sliderId = document.getElementById("attribute-slider").classList;
    genreId.add("transition-opacity", "duration-500", "ease-in-out", "opacity-0"); // Fade out animation for #genre-selector
    // Manipulation of CSS doesnt occur until animation is done
    setTimeout(() => {
      genreId.add("hidden"); // Make #genre-selector hidden
      sliderId.remove("opacity-0", "hidden"); // Removes hidden status from #attribute-slider
      sliderId.add("transition-opacity", "duration-500", "ease-in-out", "opacity-100"); // Fade in animation
      genreId.remove("transition-opacity", "duration-500", "ease-in-out", "opacity-0"); // Remove transitions from #genre-selector 
      sliderId.remove("transition-opacity", "duration-500", "ease-in-out", "opacity-100"); // Remove transitions from #attrbiute-slider
    }, 400);
  } 

  function handleBack() {
    const genreId = document.getElementById("genre-selector").classList;
    const sliderId = document.getElementById("attribute-slider").classList;
    sliderId.add("transition-opacity", "duration-500", "ease-in-out", "opacity-0"); // Fade out for #attribute selector
    setTimeout(() => {
      sliderId.add("hidden"); // Make #attribute hidden
      genreId.remove("hidden"); // Remove hidden status from #genre-selector
      genreId.add("transition-opacity", "duration-500", "ease-in-out", "opacity-100"); // Fade in animation for #genre-selector
      sliderId.remove("transition-opacity", "duration-500", "ease-in-out", "opacity-0"); // Remove transistions from #attribute-slider
      genreId.remove("transition-opacity", "duration-500", "ease-in-out", "opacity-100");  // Remove transitions from #genre-selector
    }, 400);
  }

  function handleRIB() {
    window.location.reload();
  }

  async function handleSave() {
    const userId = await getUserId(token);

    let trackUris = [];
    artists.forEach(track => {
      let uriString = track.uri;
      trackUris = [...trackUris, uriString ];
    });

    const isExist = await checkPlaylist(token);
    setExists(isExist);

    if(isExist) {
      overwritePlaylist(token, trackUris);
    } else {
      const playlistId = await createPlaylist(token, userId);
      addTracks(token, playlistId, trackUris);
    }
  }

  function handleClear() {
    window.location.reload();
  }

  return (
    <div className="flex flex-col overflow-auto h-screen bg-gray-900">
      <Header token={token} authEndpoint={AUTH_ENDPOINT} clientId={CLIENT_ID} redirectUri={REDIRECT_URI} responseType={RESPONSE_TYPE} scope={SCOPE} logout={logout} />
      {token 
        ? <div className="flex justify-center items-center">
            <form onSubmit={searchArtists}>
              <div id="genre-selector" className="grid grid-cols-5 gap-x-5 mx-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 lg:mx-20 xl:grid-cols-10 2xl:grid-cols-12 2xl:mx-72 pb-5">
                <div className="col-span-3 sm:col-span-2 md:col-span-3 lg:col-span-6 xl:col-span-7 2xl:col-span-9 pb-10">
                  <GenresLayout token={token} genres={availableGenres} setSeedGenre={setSeedGenre} />
                </div>
                <div id="attribute-slider" className="col-span-2 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-3 2xl:col-span-3">
                  <div className="sticky top-10">
                    <div className="bg-emerald-600 border-emerald-500 rounded-2xl">
                      <div className="justify-center">
                        <div className="grid grid-cols-1 text-xs font-semibold p-3 gap-x-10 gap-y-3 sm:text-lg ">
                            <div className="font-semibold">
                              <label className="" forhtml="accousticness">Acousticness</label>
                              <input className="w-full range-lg cursor-pointer accent-gray-900 bg-gray-900" id="accousticness" min={0} max={100} type="range" onChange={(e) => {setAccousticness(document.getElementById("accousticness").value / 100)}} />
                            </div>
                            <div className="font-semibold">
                              <label className="" forhtml="danceability">Danceability</label>
                              <input className="w-full range-lg cursor-pointer accent-gray-900 bg-gray-900" id="danceability" min={0} max={100} type="range" onChange={(e) => {setDanceability(document.getElementById("danceability").value / 100)}} />
                            </div>
                            <div className="font-semibold">
                              <label className="" forhtml="energy">Energy</label>
                              <input className="w-full range-lg cursor-pointer accent-gray-900 bg-gray-900" id="energy" min={0} max={100} type="range" onChange={(e) => {setEnergy(document.getElementById("energy").value / 100)}} />
                            </div>
                            <div className="font-semibold">
                              <label className="" forhtml="instrumentalness">Instrumentalness</label>
                              <input className="w-full range-lg cursor-pointer accent-gray-900 bg-gray-900" id="instrumentalness" min={0} max={100} type="range" onChange={(e) => {setInstrumentalness(document.getElementById("instrumentalness").value / 100)}} />
                            </div>
                            <div className="font-semibold">
                              <label className="" forhtml="loudness">Loudness</label>
                              <input className="w-full range-lg cursor-pointer accent-gray-900 bg-gray-900" id="loudness" min={0} max={100} type="range" onChange={(e) => {setLoudness(document.getElementById("loudness").value / 100)}} />
                            </div>
                            <div className="font-semibold">
                              <label className="" forhtml="tempo">Tempo</label>
                              <input className="w-full range-lg cursor-pointer accent-gray-900 bg-gray-900" id="tempo" min={0} max={100} type="range" onChange={(e) => {setTempo(document.getElementById("tempo").value / 100)}} />
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-3 text-sm font-bold sm:text-lg text-gray-900">
                      <button className="border-2 rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 my-1 px-2 py-1" type={"button"} onClick={handleClear}>Clear</button>
                      <button className="border-2 rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 my-1 px-2 py-1" type={"submit"}>{"Search"}</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        : <Splash token={token} authEndpoint={AUTH_ENDPOINT} clientId={CLIENT_ID} redirectUri={REDIRECT_URI} responseType={RESPONSE_TYPE} scope={SCOPE} logout={logout}/>}
      <ResultContext.Provider value={{
        token: token,
        artists: artists, 
        exists: exists,
        setExists: setExists,
        handleRIB: handleRIB,
        handleSave: handleSave
      }}>
        <ResultTracks token={token} artists={artists} exists={exists} setExists={setExists} handleRIB={handleRIB} handleSave={handleSave} />
      </ResultContext.Provider>
      <div className="mt-auto">
        <Footer />
      </div>
  </div>
  );
}

export default App;
