import React from "react";
import logo from "../../imgs/Spotify_Icon.png";
import iphone from "../../imgs/apple-iphone-13-2021-medium.png";

import { motion } from "framer-motion";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
// const REDIRECT_URI =
//   "https://randomify-git-dev-main-dukem23.vercel.app/genre-selection/";
const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;
const SCOPE = process.env.REACT_APP_SCOPE;

function Splash() {
  return (
    <motion.div
      className="container mx-auto flex flex-col justify-between h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="grid grid-cols-2 place-items-center sm:gap-x-4 ">
        <img
          src={iphone}
          className="w-3/4 sm:w-2/3 lg:w-2/3 xl:w-1/2"
          alt="mobile view of Randomify"
        />
        <div className="place-self-start self-center mr-1">
          <div className="flex flex-col gap-y-4 sm:gap-y6 md:gap-y-12 text-emerald-500 font-semibold text-base sm:text-lg md:text-2xl lg:text-3xl">
            <p>In need change of pace?</p>
            <p>Or are you craving for a different kind of buzz?</p>
            <p>
              Try to{" "}
              <span className="underline decoration-solid">Randomify</span> your
              playlists!
            </p>
          </div>
          <div className="flex sm:justify-center mt-3 sm:mt-10 md:mt-16">
            <a
              className="border-2 text-base sm:text-xl md:text-2xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 my-2 px-3 py-3 sm:py-4 sm:px-5"
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
            >
              Login to Spotify{" "}
              <img
                className="inline w-6 sm:w-10 md:w-12 lg:w-14"
                src={logo}
                alt="Spotify Icon"
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Splash;
