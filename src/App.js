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
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = "https://randomify-git-genre-selection-dukem23.vercel.app/"
  // const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
  const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;
  const SCOPE = process.env.REACT_APP_SCOPE;

  const [token, setToken] = useState("");
  const [artists, setArtists] = useState([]);

  const [exists, setExists] = useState(false);
  
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
      }, 3600 * 1000);

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    const results = document.getElementById("results").classList;
    results.add("hidden");
    window.localStorage.removeItem("token");
    window.location.href = REDIRECT_URI;
  };

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
    <div className="container mx-auto sm:flex flex-col h-4/6 sm:min-h-screen">
      <Header
        token={token}
        logout={logout}
      />
      {
        token ? (
          <GenreSelection token={token} setArtists={setArtists} />
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
