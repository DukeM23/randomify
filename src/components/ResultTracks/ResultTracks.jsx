import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import OverwritePrompt from "./OverwritePrompt";
import { useLocation, useNavigate } from "react-router-dom";
// import Track from "./Track";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";

import getUserId from "../../functions/getUserId";
import useToken from "../../hooks/useToken";
import checkPlaylist from "../../functions/checkPlaylist";
import overwritePlaylist from "../../functions/overwritePlaylist";
import createPlaylist from "../../functions/createPlaylist";
import addTracks from "../../functions/addTracks";
import RIBButton from "../Buttons/RIBButton";
import TrackSkeleton from "./TrackSkeleton";

import { motion } from "framer-motion";
import useIntersectionOberserver from "../../hooks/useIntersectionObserver";

const Track = React.lazy(() => import("./Track"));

function ResultTracks() {
  const [saved, setSaved] = useState(false);
  const [exists, setExists] = useState(false);
  const [play, setPlay] = useState(false);
  const [currRef, setCurrRef] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();
  const { tracks } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useToken();
  const token = window.localStorage.getItem("token");

  async function handleSave() {
    try {
      const userId = await getUserId(token);

      let trackUris = [];
      tracks.forEach((track) => {
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
        {tracks.tracks.map((artist, idx) => {
          if (artist.album.images.length !== 0) {
            return (
              <Suspense key={idx} fallback={<TrackSkeleton />}>
                <Track
                  artist={artist}
                  token={token}
                  currRef={currRef}
                  setCurrRef={setCurrRef}
                  play={play}
                  setPlay={setPlay}
                />
              </Suspense>
            );
          }
        })}
        <div className="flex flex-row justify-evenly text-lg sm:text-2xl md:text-3xl pb-8 pt-4">
          <RIBButton />
          <div className="flex content-center gap-x-6">
            <button
              className="border-2 font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 md:px-4  py-2 md:py-4"
              onClick={handleSave}
            >
              {saved ? "Saved!" : "Save Playlist"}
            </button>
          </div>
          {exists && (
            <OverwritePrompt
              token={token}
              artists={tracks}
              setExists={setExists}
              setSaved={setSaved}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default ResultTracks;
