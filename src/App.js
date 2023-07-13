import React, { useEffect, useState } from "react";
import Splash from "./components/Splash";
import checkPlaylist from "./functions/checkPlaylist";
import getUserId from "./functions/getUserId";
import overwritePlaylist from "./functions/overwritePlaylist";
import createPlaylist from "./functions/createPlaylist";
import addTracks from "./functions/addTracks";
import ResultTracks from "./components/ResultTracks";
import GenreSelection from "./components/GenreSelection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const ResultContext = React.createContext();
export const TokenContext = React.createContext()

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Splash />
    },
    {
      path: "/genre-selection",
      element: <GenreSelection />
    },
    {
      path: "/result",
      element: <ResultTracks />
    }
  ])
  

  return (
    <RouterProvider router={router} />
  );
}

export default App;
