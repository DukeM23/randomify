import React from "react";
import logo from "../../imgs/Spotify_Logo.png";

function Footer() {
  return (
    <div className="flex flex-col justify-center space-y-3 mb-3 mt-20">
      <img className="mx-auto w-2/12 lg:w-40" src={logo} alt="Spotify Logo" />
      <footer className="mx-auto text-sm sm:text-base text-emerald-500">
        Made with &lt;3,{" "}
        <a
          className="hover:underline"
          href="https://portfolio-website-6cmhfakgn-dukem23.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          Duke Maquiling
        </a>
      </footer>
    </div>
  );
}

export default Footer;
