import { list } from "postcss";
import React, { useState } from "react";
import { useEffect } from "react";
import AttributeSliders from "./AttributeSliders";
import Genre from "./Genre";
import Loader from "./Loader";

function GenresLayout({ genres, setSeedGenre }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const [loading, setLoading] = useState(false);
  const [availableGenres, setAvailableGenres] = useState([]);
  const [accousticness, setAccousticness] = useState(0.50);
  const [danceability, setDanceability] = useState(0.50);
  const [energy, setEnergy] = useState(0.50);
  const [instrumentalness, setInstrumentalness] = useState(0.50);
  const [loudness, setLoudness] = useState(0.50);
  const [tempo, setTempo] = useState(0.50);

  useEffect(() => {
    setSeedGenre(selectedGenres);
    console.log(selectedGenres)
  });

  function addGenre(genre) {
    setSelectedGenres((prevValue) => {
      return [...prevValue, genre];
    });
  }

  function removeGenre(genre) {
    setSelectedGenres((prevValue) => {
      if (prevValue.length === 0) {
        return [];
      }
      return prevValue.filter((value) => {
        return value !== genre;
      });
    });
  }

  function handleClear() {
    window.location.reload();
  }
  
  return (
    <div className="grid grid-cols-10 sm:grid-cols-4 gap-x-2">
      {/* <h4 className="flex justify-center">Please select genre(s) you're interested in! </h4> */}
      <div className="col-span-6 sm:col-span-3 pb-10">
        <div className="flex flex-wrap  space-x-1">
          {
            genres.map((genre, index) => {
              return (
                <Genre
                  genre={genre}
                  addGenre={addGenre}
                  removeGenre={removeGenre}
                  key={index}
                />
              );
            })
          }
        </div>
      </div>
      <div id="attribute-slider" className="col-span-4 sm:col-span-1">
        <div className="sticky top-10">
          <div className="bg-emerald-600 border-emerald-500 rounded-2xl p-5">
            <h1 className="text-base sm:text-lg font-semibold">Move the sliders depending on what you're feeling.<br /> Don't worry we won't judge 😉</h1>
            <div className="flex justify-center">
              <div className="grid grid-cols-1 text-sm sm:text-lg gap-x-10 gap-y-5 my-5">
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
            <button className="border-2 rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 font-bold my-2 px-3 py-2" type={"button"} onClick={handleClear}>Clear</button>
            <button className="border-2 rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 font-bold my-2 px-3 py-2" type={"submit"}>{loading ? <Loader /> : "Search"}</button>
          </div>
          </div>
        </div>
    </div>
  );
}

export default GenresLayout;
