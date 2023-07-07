import React, { useReducer, useState } from "react";
import GenresLayout from "./GenresLayout";
import AttributeSlider from "./AttributeSlider";
import attributeReducer from "../reducers/attributreReducer";
import Loader from "./Loader";
import getRecommended from "../functions/getReccomended";

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
    const [show, setShow] = useState(false)

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
            
          </div>
          <div class="block sm:hidden m-8 overflow-hidden bg-emerald-600 border-emerald-500 border-2 rounded-2xl">
            <div class="group outline-none accordion-section " tabindex="1">
              <div class="group  text-gray-900 transition ease duration-500 cursor-pointer relative" onClick={() => {setShow(!show)}}>
                <div class=" text-gray-900 text-center transition ease duration-1000">
                 <button type="button" className="my-3 text-2xl font-bold">
                  Change it up!
                 </button>
                </div>
                
              </div>
              <div class={`${show ? "max-h-screen" : "max-h-0"} px-4 overflow-hidden ease duration-1000`}>
              <div className="text-gray-900 block sm:hidden overflow-hidden transition 1s ease-out">
                <div className="flex flex-col w-full px-10 gap-y-5 my-8 sm:px-5">
                  {
                    state.map(attr => <AttributeSlider
                      attribute={attr}
                      dispatch={dispatch}
                    />)
                  }
                  <button type="button" onClick={() => {setShow(false)}}>Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${seedGenre.length === 0 ? "invisible" : "flex"} justify-around font-bold lg:text-xl xl:text-2xl text-gray-900 mb-5`}>
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
        </form>
          
        </div>

    );
}

export default GenreSelection