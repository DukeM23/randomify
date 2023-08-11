import React from "react";
import logo from "../../imgs/Spotify_Icon.png";
import iphone from "../../imgs/apple-iphone-13-2021-medium.png";

import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";

import { motion } from "framer-motion";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
// const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const REDIRECT_URI =
  "https://randomify-git-dev-main-dukem23.vercel.app/genre-selection/";
const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;
const SCOPE = process.env.REACT_APP_SCOPE;

function Splash() {
  return (
    <motion.div
      className="container mx-auto flex flex-col justify-between h-4/6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <Header /> */}
      <div className="grid grid-cols-2 place-items-center sm:gap-x-4 mb-auto my-10">
        <img
          src={iphone}
          className="w-3/4 sm:w-1/3"
          alt="mobile view of Randomify"
        />
        <div className="place-self-start self-center mr-1">
          <div className="flex flex-col gap-y-4 sm:gap-y6 md:gap-y-14 text-emerald-500 font-semibold text-base sm:text-2xl md:text-4xl">
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
              className="border-2 text-base sm:text-2xl md:text-3xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 my-2 px-3 py-3 sm:py-4 sm:px-5"
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
            >
              Login to Spotify{" "}
              <img
                className="inline w-6 sm:w-14"
                src={logo}
                alt="Spotify Icon"
              />
            </a>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </motion.div>
  );
}

export default Splash;
