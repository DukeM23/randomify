import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Splash from './components/Splash';
import GenreSelection from './components/GenreSelection';
import GenresLayout from './components/GenresLayout';
import ResultTracks from './components/ResultTracks';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Splash />
  },
  {
    path: "/genre-selection",
    element: <App />
  },
  {
    path: "/result",
    element: <ResultTracks />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
