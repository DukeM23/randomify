import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import OverwritePrompt from "../../components/ResultTracks/OverwritePrompt";
import { useLocation, useNavigate } from "react-router-dom";

import getUserId from "../../functions/getUserId";
import useToken from "../../hooks/useToken";
import checkPlaylist from "../../functions/checkPlaylist";
import overwritePlaylist from "../../functions/overwritePlaylist";
import createPlaylist from "../../functions/createPlaylist";
import addTracks from "../../functions/addTracks";
import RIBButton from "../../components/Buttons/RIBButton";
import TrackSkeleton from "../../components/ResultTracks/Track/TrackSkeleton";

import { motion } from "framer-motion";
import SavePlaylist from "../../components/Buttons/SavePlaylist";

const Track = React.lazy(() =>
  import("../../components/ResultTracks/Track/Track")
);

function ResultTracks() {
  const [saved, setSaved] = useState(false);
  const [exists, setExists] = useState(false);
  const [currRef, setCurrRef] = useState("");
  const [resultTracks, setResultTracks] = useState([]);
  const [playingTrack, setPlayingTrack] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();

  useToken();
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (state === null) {
      alert("Request could not be handled. Please login again.");
      window.localStorage.removeItem("token");
      navigate("/");
    } else {
      const { tracks } = state;
      setResultTracks(tracks.tracks);
    }

    window.scrollTo(0, 0);
  }, []);

  async function handleSave() {
    try {
      const userId = await getUserId(token);
      let trackUris = [];
      resultTracks.forEach((track) => {
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
    } catch (err) {
      alert("Request could not be handled. Please login again.");
      window.localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <motion.div
      className="container mx-auto sm:flex flex-col h-4/6 sm:min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        id="results"
        className="flex flex-col divide-y divide-emerald-500 container mx-auto sm:flex h-4/6 sm:min-h-screen"
      >
        {resultTracks.map((artist, idx) => {
          if (artist.album.images.length === 0) {
            return null;
          }
          return (
            <Suspense key={idx} fallback={<TrackSkeleton />}>
              <Track
                artist={artist}
                token={token}
                currRef={currRef}
                setCurrRef={setCurrRef}
                playingTrack={playingTrack}
                setPlayingTrack={setPlayingTrack}
              />
            </Suspense>
          );
        })}
        <div className="flex flex-row flex-wrap justify-evenly text-lg sm:text-2xl md:text-3xl pb-8 pt-4 gap-y-4">
          <RIBButton />
          <div className="flex content-center gap-x-6">
            <SavePlaylist handleSave={handleSave} />
          </div>
          <h1
            className={`basis-full text-center font-semibold text-emerald-500 transition-opacity duration-1000 ease-in-out ${
              !saved ? "opacity-0" : "opacity-100"
            }`}
          >
            Playlist saved!
          </h1>
        </div>
      </div>
      {exists && (
        <div className="fixed h-screen w-screen top-0 left-0 z-90">
          <div className="relative top-0">
            <OverwritePrompt
              token={token}
              tracks={resultTracks}
              setExists={setExists}
              setSaved={setSaved}
            />
          </div>
        </div>
      )}
      <div></div>
    </motion.div>
  );
}

export default ResultTracks;
