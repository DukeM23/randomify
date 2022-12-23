import React from "react";
import { ResultContext } from "../App";
import Artists from "./Artist";
import OverwritePrompt from "./OverwritePrompt";

function ResultTracks() {
    const value = React.useContext(ResultContext);

    function artistFormat(artist) {
        return artist.artists.map((el, index) => {
            return el.name
        }).join(', ')
    }

    const renderArtists = () => {
        return value.artists.map((artist, index) => (
          <div className="mx-auto my-2 bg-gray-300 text-gray-900 rounded-lg shadow-lg w-8/12 sm:w-2/3 xl:w-3/5" key={index}>
            <div className="flex flex-row">
              <a className="basis-2/6 lg:basis-3/12 drop-shadow-2xl hover:underline overflow-hidden" href={artist.external_urls.spotify}>
                {artist.album.images ? <img className="rounded-l-md" src={artist.album.images[0].url} alt="Band lmao"/> : <div>No Image</div>}
              </a>
              <div className="flex flex-col basis-4/6 lg:basis-9/12 justify-center pl-5 sm:gap-y-2">
                <h2 className="font-bold text-xs sm:text-2xl md:text-4xl"><a className="hover:underline" href={artist.external_urls.spotify} target="_blank">{artist.name}</a></h2>
                <div className="flex flex-wrap text-xs sm:text-base md:text-2xl">
                {
                    artistFormat(artist)
                }
                </div>
            
                {/* <h2 className="font-semibold text-sm sm:text-xl md:text-md lg:text-xl capitalize"><a href={artist.artists.external_urls.spotify}>{artist.artists[0].name}</a></h2>    */}
                 {/* <Artists artist={artist} /> */}
              </div>
            </div>
          </div>
        ));      
      }

    return(
        <div id="results" className="flex flex-col hidden">
        {renderArtists()}
        <div className="flex flex-row justify-evenly py-5">
          <button className="border-2 text-lg sm:text-2xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2" onClick={value.handleRIB}>Run it back!</button>
          <button className="border-2 text-lg sm:text-2xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2" onClick={value.handleSave}>Save Playlist</button>
          { 
            value.exists 
            ? <OverwritePrompt token={value.token} artists={value.artists} setExists={value.setExists}/>
            : ""
          }
        </div>
      </div>
    );
}

export default ResultTracks