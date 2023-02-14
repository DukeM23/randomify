import React from "react";
import { useState } from "react";
import { ResultContext } from "../App";
import OverwritePrompt from "./OverwritePrompt";

function ResultTracks() {
  const [saved, setSaved] = useState(false); 
  const value = React.useContext(ResultContext);

  function artistFormat(artist) {
    return artist.artists
      .map((el, index) => {
        return el.name;
      })
      .join(", ");
  }

  const renderArtists = () => {
    return value.artists.map((artist, index) => (
      <div key={index} className="grid grid-cols-3 gap-x-4 py-2 px-4 sm:px-4 md:grid-cols-8 md:py-4 md:gap-x-8">
        <a
          className="col-span-1 flex flex-col justify-center drop-shadow-2xl md:col-span-2 xl:col-span-1"
          href={artist.external_urls.spotify}
        >
          {artist.album.images ? (
            <img
              className="rounded-md"
              src={artist.album.images[0].url}
              alt="Band lmao"
            />
          ) : (
            <div>No Image</div>
          )}
        </a>
        <div className="col-span-2 flex flex-col justify-center gap-y-1 md:col-span-6">
          <h2 className="text-emerald-500 font-bold text-base sm:text-2xl md:text-3xl xl:text-4xl truncate">
            <a
              className="hover:underline"
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
            >
              {artist.name}
            </a>
          </h2>
          <div className="text-emerald-600 text-sm sm:text-lg md:text-xl xl:text-2xl">
            <p className="truncate">{artistFormat(artist)}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div
      id="results"
      className="flex flex-col hidden divide-y divide-emerald-500 mx-5 sm:mx-10 lg:mx-32 xl:mx-48 2xl:mx-96"
    >
      {renderArtists()}
      <div className="flex flex-row justify-evenly text-lg sm:text-2xl md:text-3xl pb-8 pt-4">
        <button
          className="border-2 font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 md:px-4  py-2 md:py-4"
          onClick={value.handleRIB}
        >
          Run it back!
        </button>
        <div className="flex content-center gap-x-6">
          <button
            className="border-2 font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 md:px-4  py-2 md:py-4"
            onClick={value.handleSave}
          >
            {saved ? "Saved!" : "Save Playlist"}
          </button>
          {/* <p className="py-2 md:py-4">Playlist Saved!</p> */}
        </div>
        {value.exists ? (
          <OverwritePrompt
            token={value.token}
            artists={value.artists}
            setExists={value.setExists}
            setSaved={setSaved}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ResultTracks;
