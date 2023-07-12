import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import Splash from "./components/Splash";
import Footer from "./components/Footer";
import checkPlaylist from "./functions/checkPlaylist";
import getUserId from "./functions/getUserId";
import overwritePlaylist from "./functions/overwritePlaylist";
import createPlaylist from "./functions/createPlaylist";
import addTracks from "./functions/addTracks";
import ResultTracks from "./components/ResultTracks";
import GenreSelection from "./components/GenreSelection";

export const ResultContext = React.createContext();
export const TokenContext = React.createContext()

function App() {
  const [token, setToken] = useState("");
  const [artists, setArtists] = useState([]);

  const [exists, setExists] = useState(false);
  
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    console.log("hello")
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
      }, 3600 * 1000);

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    
    setToken(token);
    // console.log(token)
  }, [token]);


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
    <div className="container mx-auto sm:flex flex-col h-4/6 sm:min-h-screen">
      <Header />
      <GenreSelection token={token} setArtists={setArtists} />
      <Footer />
    </div>
  );
}

export default App;
