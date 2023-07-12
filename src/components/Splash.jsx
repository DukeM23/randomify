import React from "react";
import logo from "../imgs/Spotify_Icon.png"
import iphone from "../imgs/apple-iphone-13-2021-medium.png"

import Header from "./Header";
import Footer from "./Footer";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
// const REDIRECT_URI = "https://randomify-git-genre-selection-dukem23.vercel.app/genre-selection/"
const REDIRECT_URI = "http://localhost:3000/genre-selection"
const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;
const SCOPE = process.env.REACT_APP_SCOPE;


function Splash() {
  return (
    <div className="container mx-auto flex flex-col justify-between h-4/6 min-h-screen">
      <Header />
      <div className="grid grid-cols-2 place-items-center gap-x-0 sm:gap-x-5 mb-auto my-10">
        <img src={iphone} alt="mobile view of Randomify" className=""/>
        <div className="place-self-start self-center">
          <div className="flex flex-col gap-y-8 text-emerald-500 font-semibold text-base sm:text-3xl">
            <p>In need change of pace?</p>
            <p>
              Or are you craving for a different kind of buzz?
            </p>
            <p>
              Try to <span className="underline decoration-solid">Randomify</span>{" "}
              your playlists!
            </p>
          </div>
          <div className="flex justify-center mt-20">
            <a
              className="border-2 text-xl sm:text-2xl md:text-3xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 my-2 px-5 py-3 sm:py-4"
              href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
            >
              Login to Spotify <img className="inline w-9 sm:w-16" src={logo} alt="Spotify Icon" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Splash;
