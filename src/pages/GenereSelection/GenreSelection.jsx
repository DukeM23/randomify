import React, { Suspense, useReducer, useState } from "react";
import attributeReducer from "../../reducers/attributreReducer";
import Loader from "../../components/Loaders/Loader";
import getRecommended from "../../functions/getReccomended";
import { useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import ChangeItUp from "../../components/GenreSelection/ChangeItUp/ChangeItUp";
import { motion } from "framer-motion";
import GenreSkeleton from "../../components/GenreSelection/GenreSkeleton";
import ReducerContext from "../../components/GenreSelection/ReducerContext";
import Sliders from "../../components/GenreSelection/Sliders";
import { attributeState } from "../../data/attributeState";
import ClearButton from "../../components/Buttons/ClearButton";
import SearchSubmit from "../../components/Buttons/SearchSubmit";

const GenresLayout = React.lazy(() =>
  import("../../components/GenreSelection/GenresLayout")
);

function GenreSelection({ setArtists }) {
  const [state, dispatch] = useReducer(attributeReducer, attributeState);
  const providerState = {
    state,
    dispatch,
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [seedGenre, setSeedGenre] = useState("");

  useToken();
  const token = window.localStorage.getItem("token");

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

    try {
      setLoading(true);
      const response = await getRecommended(
        token,
        query,
        attributeState[0].value,
        attributeState[1].value,
        attributeState[2].value,
        attributeState[3].value,
        attributeState[4].value,
        attributeState[5].value
      );
      setLoading(false);
      navigate("/result", {
        state: {
          tracks: response.data,
        },
      });
    } catch (err) {
      alert("Request could not be handled. Please login again.");
      window.localStorage.removeItem("token");
      navigate("/");
    }
  };

  function handleRIB() {
    window.location.reload();
  }

  return (
    <motion.div
      className=""
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form id="customization" className="block" onSubmit={searchArtists}>
        <div className="text-xl sm:text-3xl text-center font-bold text-emerald-500 my-10 mx-2">
          <h1 className="mb-5">Choose genres to randomify.</h1>
          <p>
            <span className="underline text-emerald-500">Change It Up</span> by
            moving the sliders till your heart's content
          </p>
        </div>
        <ReducerContext.Provider value={providerState}>
          <div className="gap-x-0 sm:grid sm:grid-cols-6 sm:gap-x-5 xl:grid-cols-10">
            <div
              id="genre-selector"
              className="pb-5 sm:col-span-4 sm:mx-auto lg:col-span- xl:col-span-7 w-full min-h-screen"
            >
              <Suspense fallback={<GenreSkeleton />}>
                <GenresLayout
                  setSeedGenre={setSeedGenre}
                  handleRIB={handleRIB}
                />
              </Suspense>
            </div>
            <div className="hidden sm:block sm:col-span-2 lg:col-span- xl:col-span-3">
              <div id="attribute-slider" className="sm:sticky sm:top-10">
                <Sliders />
                <div
                  className={`${
                    seedGenre.length === 0 ? "invisible" : "hidden"
                  } sm:flex justify-around font-bold lg:text-xl xl:text-2xl text-gray-900 mb-5`}
                >
                  <ClearButton />
                  <SearchSubmit loading={loading} />
                </div>
              </div>
            </div>
          </div>
          <div
            className={`${
              seedGenre.length === 0 ? "invisible" : "flex"
            } sm:hidden justify-around font-bold text-xl xl:text-2xl text-gray-900 mb-5`}
          >
            <ClearButton />
            <SearchSubmit loading={loading} />
          </div>
          <div className="block sm:hidden sticky bottom-0 py-[1px] backdrop-blur-sm">
            <ChangeItUp />
          </div>
        </ReducerContext.Provider>
      </form>
    </motion.div>
  );
}

export default GenreSelection;
