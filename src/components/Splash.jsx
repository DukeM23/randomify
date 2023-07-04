import React from "react";
import logo from "../imgs/Spotify_Icon.png"
import iphone from "../imgs/apple-iphone-13-2021-medium.png"

function Splash({ authEndpoint, clientId, redirectUri, responseType, scope }) {
  return (
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
            className="border-2 text-xl sm:text-3xl md:text-4xl font-semibold rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 my-2 px-5 py-3 sm:py-4"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`}
          >
            Login to Spotify <img className="inline w-9 ml- sm:w-16" src={logo} alt="Spotify Icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Splash;
