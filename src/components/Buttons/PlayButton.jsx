import { useState } from "react";

export default function PlayButton({ artist, onClick }) {
  const { id, preview_url } = artist;
  return (
    <button
      id={id}
      className={
        (preview_url === null ? "hover:cursor-not-allowed opacity-50" : "") +
        " rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 py-2 md:p-4 md:py-3"
      }
      onClick={onClick}
    >
      <i className={`fas fa-play ml-1`}></i>
    </button>
  );
}
