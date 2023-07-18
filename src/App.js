import React from "react";
import Splash from "./components/Splash/Splash";
import ResultTracks from "./components/ResultTracks/ResultTracks";
import GenreSelection from "./components/GenreSelection/GenreSelection";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

export const ResultContext = React.createContext();
export const TokenContext = React.createContext();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Splash />,
    },
    {
      path: "/genre-selection",
      element: <GenreSelection />,
    },
    {
      path: "/result",
      element: <ResultTracks />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
