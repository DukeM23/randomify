import React, { useEffect, useState } from "react";
import GenresLayout from "./GenresLayout";
import AttributeSlider from "./AttributeSlider";
import Loader from "./Loader";

import getRecommended from "../functions/getReccomended";


function GenreSelection({ token, setArtists }) {
    const [accousticness, setAccousticness] = useState(0.5);
    const [danceability, setDanceability] = useState(0.5);
    const [energy, setEnergy] = useState(0.5);
    const [instrumentalness, setInstrumentalness] = useState(0.5);
    const [loudness, setLoudness] = useState(0.5);
    const [tempo, setTempo] = useState(0.5);

    const [loading, setLoading] = useState(false);
    const [seedGenre, setSeedGenre] = useState("");
 
    const searchArtists = async (e) => {
        e.preventDefault();

        let query = "";
        let i = 0;
        seedGenre.forEach((genre) => {
        if (i === seedGenre.length - 1) {
            query += genre;
        } else {
            query += `${genre},`;
        }
        i++;
        });

        if (query === "") {
        setArtists([]);
        return false;
        }

        setLoading(true);
        const tracks = await getRecommended(token,
                                            query,
                                            accousticness,
                                            danceability,
                                            energy,
                                            instrumentalness,
                                            loudness,
                                            tempo
                                            );

        setArtists(tracks);
        setLoading(false);

        const results = document.getElementById("results").classList;
        const sliderId = document.getElementById("customization").classList;
        results.remove("hidden");
        sliderId.add("hidden");
    };

    function handleRIB() {
        window.location.reload();
    }

    return (
      <div className="flex justify-center items-center px-5 mb-auto sm:px-8 xl:px-52 2xl:px-92">
        <form id="customization" onSubmit={searchArtists}>
          <div className="gap-x-0 sm:grid sm:grid-cols-6 sm:gap-x-5 xl:grid-cols-10">
            <div
              id="genre-selector"
              className="pb-5 sm:col-span-4 sm:mx-auto lg:col-span- xl:col-span-7"
            >
              <GenresLayout token={token} setSeedGenre={setSeedGenre} />
            </div>
            <div className="sm:col-span-2 lg:col-span- xl:col-span-3">
              <div id="attribute-slider" className="sm:sticky sm:top-10">
                <div className="bg-emerald-600 border-emerald-500 border-2 rounded-2xl">
                  <div className="flex justify-center">
                    <div className="flex flex-col w-full px-10 gap-y-5 my-5 sm:px-5">
                      <AttributeSlider
                        attribute="Acousticness"
                        setSliderVal={setAccousticness}
                      />
                      <AttributeSlider
                        attribute="Danceability"
                        setSliderVal={setDanceability}
                      />
                      <AttributeSlider
                        attribute="Energy"
                        setSliderVal={setEnergy}
                      />
                      <AttributeSlider
                        attribute="Instrumentalness"
                        setSliderVal={setInstrumentalness}
                      />
                      <AttributeSlider
                        attribute="Loudness"
                        setSliderVal={setLoudness}
                      />
                      <AttributeSlider
                        attribute="Tempo"
                        setSliderVal={setTempo}
                      />
                    </div>
                  </div>
                </div>
                {seedGenre.length !== 0 && (
                  <div className="flex justify-around font-bold lg:text-xl xl:text-2xl text-gray-900">
                    <button
                      className="border-2 rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 font-bold my-2 px-3 py-2"
                      type={"button"}
                      onClick={handleRIB}
                    >
                      Clear
                    </button>
                    <button
                      className="border-2 rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 font-bold my-2 px-3 py-2"
                      type={"submit"}
                    >
                      {loading ? <Loader /> : "Search"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    );
}

export default GenreSelection