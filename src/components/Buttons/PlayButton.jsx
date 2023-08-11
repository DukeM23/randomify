import { useRef, useState } from "react";

export default function PlayButton({ artist, onClick, currRef, audioRef }) {
  const { id, preview_url } = artist;

  // const [play, setPlay] = useState(false);

  function handleOnClick(e) {
    e.preventDefault();
    if (preview_url) {
      // setPlay((prevVal) => !prevVal);
      onClick();
    }
  }
  return (
    <button
      id={id}
      className={
        (preview_url === null ? "hover:cursor-not-allowed opacity-50" : "") +
        " rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2 md:p-4 md:py-3 h-11 w-11 sm:h-14 sm:w-14"
      }
      onClick={handleOnClick}
    >
      {currRef !== audioRef ? (
        <i className={`fas fa-play ml-1`}></i>
      ) : (
        <div className="h-full w-full">
          <div className="flex h-full items-center gap-x-1">
            <div className="w-1/3 h-1/3 bg-gray-900 border-transparent border rounded-full animate-playing-sides"></div>
            <div className="w-1/3 h-2/3 bg-gray-900 border-transparent border rounded-full animate-playing-middle"></div>
            <div className="w-1/3 h-1/3 bg-gray-900 border-transparent border rounded-full animate-playing-sides"></div>
          </div>
        </div>
      )}
    </button>
  );
}
