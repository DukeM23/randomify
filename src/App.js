import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import AnimatedRoutes from "./components/AnimatedRoutes/AnimatedRoutes";

export const ResultContext = React.createContext();
export const TokenContext = React.createContext();

function App() {
  return (
    <Router>
      <div className="container mx-auto sm:flex">
        <div className="flex flex-col justify-between w-full min-h-screen">
          <Header />
          <div className="my-auto">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
