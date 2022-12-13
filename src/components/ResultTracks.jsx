import React from "react";
import { useEffect } from "react";
import OverwritePrompt from "./OverwritePrompt";

function ResultTracks({token, artists, exists, setExists, handleRIB, handleSave}) {

    useEffect(() => {
        return () => {
            // const results = document.getElementById("results").classList;
            // results.add("hidden");
        }
    }, []);
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
              </div>
            </div>
          </div>
        ));      
      }

    return(
        <div id="results" className="flex flex-col hidden">
        {renderArtists()}
        <div className="flex flex-row justify-evenly py-5">
          <button className="border-2 text-lg sm:text-2xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2" onClick={handleRIB}>Run it back!</button>
          <button className="border-2 text-lg sm:text-2xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2" onClick={handleSave}>Save Playlist</button>
          { 
            exists 
            ? <OverwritePrompt token={token} artists={artists} setExists={setExists}/>
            : ""
          }
        </div>
      </div>
    );
}

export default ResultTracks