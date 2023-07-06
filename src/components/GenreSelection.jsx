import React, { useReducer, useState } from "react";
import GenresLayout from "./GenresLayout";
import AttributeSlider from "./AttributeSlider";
import attributeReducer from "../reducers/attributreReducer";
import Loader from "./Loader";
import getRecommended from "../functions/getReccomended";
import Footer from "./Footer";
const attributeState = [
  {
    type: "set_accousticness",
    name: "Accousticness",
    value: 0.5,
  },
  {
    type: "set_danceability",
    name: "Danceability",
    value: 0.5,
  },
  {
    type: "set_energy",
    name: "Energy",
    value: 0.5,
  },
  {
    type: "set_instrumentalness",
    name: "Instrumentalness",
    value: 0.5,
  },
  {
    type: "set_loudness",
    name: "Loudness",
    value: 0.5,
  },
  {
    type: "set_tempo",
    name: "Tempo",
    value: 0.5,
  },
]

function GenreSelection({ token, setArtists }) {

    const [state, dispatch] = useReducer(attributeReducer, attributeState)

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
                                            attributeState[0].value,
                                            attributeState[1].value,
                                            attributeState[2].value,
                                            attributeState[3].value,
                                            attributeState[4].value,
                                            attributeState[5].value
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
      <div className="">
        <form id="customization" onSubmit={searchArtists}>
          <div className="gap-x-0 sm:grid sm:grid-cols-6 sm:gap-x-5 xl:grid-cols-10">
            <div
              id="genre-selector"
              className="pb-5 sm:col-span-4 sm:mx-auto lg:col-span- xl:col-span-7"
            >
              <GenresLayout token={token} setSeedGenre={setSeedGenre} handleRIB={handleRIB} />
            </div>
            <div className="hidden sm:block sm:col-span-2 lg:col-span- xl:col-span-3">
              <div id="attribute-slider" className="sm:sticky sm:top-10">
                <div className="bg-emerald-600 border-emerald-500 border-2 rounded-2xl">
                  <div className="flex justify-center">
                    <div className="flex flex-col w-full px-10 gap-y-5 my-5 sm:px-5">
                      {
                        state.map(attr => <AttributeSlider
                          attribute={attr}
                          dispatch={dispatch}
                        />)
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-gray-900 fixed sm:hidden origin-top bottom-0 w-full h-full transition-transform ease-in 1s translate-y-[49rem] hover:translate-y-[15rem] bg-emerald-600 border-emerald-500 border-2 rounded-t-2xl">
              <div className="flex justify-center mt-4">
                <p className="text-3xl font-semibold">Change it up!</p>
              </div>
              <div className="flex flex-col w-full px-10 gap-y-5 my-8 sm:px-5">
                {
                  state.map(attr => <AttributeSlider
                    attribute={attr}
                    dispatch={dispatch}
                  />)
                }
                </div>
                {
                  seedGenre.length !== 0 && (
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
                  )
                }
              </div>
          </div>
        </form>
      </div>
    );
}

export default GenreSelection