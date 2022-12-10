import {useEffect, useState} from "react";

import Header from "./components/Header";

import axios from "axios";
import GenresLayout from "./components/GenresLayout";
import Splash from "./components/Splash";
import Footer from "./components/Footer";
import checkPlaylist from "./functions/checkPlaylist";

function App() {

  const CLIENT_ID = "4824b5ae50b14db4b523abf744daed42";
  const REDIRECT_URI = "http://localhost:3000/";
  // const REDIRECT_URI = "https://randomify-silk.vercel.app/";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  const SCOPE = "playlist-modify-private playlist-modify-public";

  const [token, setToken] = useState("");
  const [artists, setArtists] = useState([])

  const [userId, setUserId] = useState("");

  const [seedGenre, setSeedGenre] = useState("");
  const [availableGenres, setAvailableGenres] = useState([]);
  const [accousticness, setAccousticness] = useState(0.50);
  const [danceability, setDanceability] = useState(0.50);
  const [energy, setEnergy] = useState(0.50);
  const [instrumentalness, setInstrumentalness] = useState(0.50);
  const [loudness, setLoudness] = useState(0.50);
  const [tempo, setTempo] = useState(0.50);
  
  useEffect(() => {
    
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if(!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];
      const timeout = hash.substring(1).split("&").find(elem => elem.startsWith("expires_in")).split("=")[1];
      
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
    window.localStorage.removeItem("token");
    window.location.reload();
  }

  const genreSeeds = async (token) => {
    try {
      const {data} = await axios.get("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      // console.log(`${response} response`)
      setAvailableGenres(data.genres);
    } catch (e) {
      console.log("something went wrong");
    }
    
  }

  const searchArtists = async (e) => {
    e.preventDefault()

    if(seedGenre === "") {
      setArtists([]);
      return false;
    }

    const {data} = await axios.get("https://api.spotify.com/v1/recommendations", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            seed_genres: seedGenre,
            target_accousticness: accousticness,
            target_danceability: danceability,
            target_energy: energy,
            target_instrumentalness: instrumentalness,
            target_loudness: loudness,
            target_tempo: tempo
        }
    });

    setArtists(data.tracks);

    const results = document.getElementById("results").classList;
    const sliderId = document.getElementById("attribute-slider").classList;
    results.remove("hidden");
    sliderId.add("hidden");
  } 

  function formatGenres(genres) {
    let query = "";
    let i = 0
    genres.forEach(genre => {
      if(i === genres.length-1) {
        query += genre;
      } else {
        query += `${genre},`
      }
      i++;
    });
    setSeedGenre(query);
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

  function handleSave() {
    axios.get("https://api.spotify.com/v1/me", 
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }).then(res => {
        // console.log(res.data.id);

          let trackUris = [];
          artists.forEach(track => {
            let uriString = track.uri;
            trackUris = [...trackUris, uriString ];
          });
          
          console.log(checkPlaylist(token));

          checkPlaylist(token).then(isExists => {
            if(isExists) {
              window.alert("You already have a Randomify Playlist already!");
            } else {
              const userId = res.data.id;
              axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                "name": "Randomify #1",
                "description": "Goofy ahh",
                "public": true
              }, 
              {
                headers: {
                    Authorization: `Bearer ${token}`
                }
              }).then(res => {
                const playlistId = res.data.id;
                axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks `, {
                  "uris": trackUris,
                  "position": 0
                }, 
                {
                  headers: {
                      Authorization: `Bearer ${token}`
                  }
                })
              }) 
            }
          });
      });
  }

  const renderArtists = () => {
    // console.log(artists)
    return artists.map((artist, index) => (
      <div className="mx-auto my-2 bg-gray-300 text-gray-900 rounded-lg shadow-lg w-8/12 sm:w-2/3 xl:w-1/2" key={Math.random() * index}>
        <div className="flex flex-row">
          <a className="basis-2/6 lg:basis-3/12 drop-shadow-2xl hover:underline" href={artist.external_urls.spotify}>
            {artist.album.images ? <img className="rounded-l-md" src={artist.album.images[0].url} alt="Band lmao"/> : <div>No Image</div>}
          </a>
          <div className="flex flex-col basis-4/6 lg:basis-9/12 justify-center pl-5 sm:gap-y-2">
            <h2 className="font-bold text-xs sm:text-2xl md:text-4xl"><a className="hover:underline" href={artist.external_urls.spotify}>{artist.name}</a></h2>
            <h2 className="font-semibold text-sm sm:text-xl md:text-md lg:text-xl capitalize">{artist.artists[0].name}</h2>  
            {/* <h2 className="font-semibold capitalize">Album: {artist.album.name}</h2> */}
            {/* Not a good idea to have the embedded player */}
            {/* <iframe className="rounded" src="https://open.spotify.com/embed/album/1tTNmG8vM17Aboe7vB43Tf?utm_source=generator" width="100%" height="80" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> */}
          </div>
        </div>
      </div>
    ));      

  }

  return (
    <div className="flex flex-col overflow-auto h-screen">
      <Header token={token} authEndpoint={AUTH_ENDPOINT} clientId={CLIENT_ID} redirectUri={REDIRECT_URI} responseType={RESPONSE_TYPE} scope={SCOPE} logout={logout} />
      {token 
        ? <div className="flex justify-center items-center px-5">
            <form onSubmit={searchArtists}>
              <div id="genre-selector" className="sm:mx-auto pb-5">
                {/* <h3 className="text-5xl text-emerald-300 font-semibold">Click on genres you want to hear: </h3> */}
                <GenresLayout genres={availableGenres} formatGenres={formatGenres} />

                {
                  // seedGenre !== "" 
                  // ? 
                  <div className={(seedGenre !== "" ? "flex justify-end gap-x-3" : "invisible") }>
                    <button className="border-2 text-3xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2" type={"button"} onClick={handleNext}>Next</button>
                  </div>
                  // : ""
                }

              </div>
              <div id="attribute-slider" className="block pb-36 pt-36 opacity-0 hidden">
                <div className="bg-emerald-600 border-emerald-500 rounded-2xl p-5">
                  <h1 className="text-lg sm:text-2xl font-semibold">Move the sliders depending on what you're feeling.<br /> Don't worry we won't judge 😉</h1>
                  <div className="flex justify-center">
                    <div className="grid grid-cols-2 text-base sm:text-2xl gap-x-10 gap-y-5 my-5">
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
                <div className="flex justify-between mt-3 text-xl sm:text-2xl text-gray-900">
                    <button className="border-2 rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 font-bold my-2 px-3 py-2" type={"button"} onClick={handleBack}>Back</button>
                    <button className="border-2 rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 font-bold my-2 px-3 py-2" type={"submit"}>Search</button>
                  </div>
              </div>
            </form>
          </div>
        : <Splash token={token} authEndpoint={AUTH_ENDPOINT} clientId={CLIENT_ID} redirectUri={REDIRECT_URI} responseType={RESPONSE_TYPE} scope={SCOPE} logout={logout}/>}
      
      <div id="results" className="flex flex-col hidden">
        {renderArtists()}
        <div className="flex flex-row justify-evenly py-5">
          <button className="border-2 text-lg sm:text-2xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2" onClick={handleRIB}>Run it back!</button>
          <button className="border-2 text-lg sm:text-2xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2" onClick={handleSave}>Save Playlist</button>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
  </div>
  );
}

export default App;
