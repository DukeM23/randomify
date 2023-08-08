import { useLocation, Routes, Route } from "react-router-dom";
import React from "react";
import { AnimatePresence } from "framer-motion";

import Splash from "../Splash/Splash";
// import ResultTracks from "../ResultTracks/ResultTracks";
import GenreSelection from "../GenreSelection/GenreSelection";
import FourOhFour from "../404/404";

const ResultTracks = React.lazy(() => import("../ResultTracks/ResultTracks"));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Splash />} />
        <Route path="/genre-selection" element={<GenreSelection />} />
        <Route path="/result" element={<ResultTracks />} />
        <Route path="*" element={<FourOhFour />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
