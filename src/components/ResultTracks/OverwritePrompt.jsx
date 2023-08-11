import React from "react";
import overwritePlaylist from "../../functions/overwritePlaylist";
import { useNavigate } from "react-router-dom";

function OverwritePrompt({ token, tracks, setExists, setSaved }) {
  const navigate = useNavigate();
  function handleCancel() {
    setExists(false);
  }

  async function handleOverwrite() {
    let trackUris = [];
    tracks.tracks.forEach((track) => {
      let uriString = track.uri;
      trackUris = [...trackUris, uriString];
    });

    try {
      let res = await overwritePlaylist(token, trackUris);
      if (res.status === 201) {
        setSaved(true);
        setInterval(() => {
          setSaved(false);
        }, 1000);
      }

      setExists(false);
    } catch (err) {
      alert("Request could not be handled. Please login again.");
      window.localStorage.removeItem("token");
      navigate("/");
    }
  }

  return (
    <div className=" flex justify-center bg-transparent w-full h-screen top-0 left-0 backdrop-blur-sm">
      <div className="fixed w-4/5 md:w-3/5 sm:h-1/5 top-1/2 border-4 border-gray-900 bg-white rounded-xl p-4 sm:p-6">
        <div className="flex flex-col justify-center gap-y-2 text-gray-900 h-full">
          <h3 className="text-base sm:text-xl lg:text-3xl font-bold">
            A Randomify playlist already exists!
          </h3>
          <p className="text-sm sm:text-base lg:text-xl">
            Would you like to overwrite your existing songs?
          </p>
          <div className="flex justify-end gap-x-3 mt-2">
            <button
              className="border-2 text-xs sm:text-lg font-semibold rounded-full border-gray-900 bg-gray-900 text-gray-100 px-3 py-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="border-2 text-xs sm:text-lg font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2"
              onClick={handleOverwrite}
            >
              Overwrite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverwritePrompt;
