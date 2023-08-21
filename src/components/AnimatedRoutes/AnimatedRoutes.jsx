import { useLocation, Routes, Route } from "react-router-dom";
import React from "react";
import { AnimatePresence } from "framer-motion";

import Splash from "../../pages/Splash/Splash";
import GenreSelection from "../../pages/GenereSelection/GenreSelection";
import FourOhFour from "../../pages/404/404";

const ResultTracks = React.lazy(() =>
  import("../../pages/ResultTracks/ResultTracks")
);

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
