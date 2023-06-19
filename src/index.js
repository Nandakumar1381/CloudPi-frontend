import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Locked from './pages/Locked';
import Starred from './pages/Starred';
import Storage from './pages/Storage';
import Documents from './pages/Documents';
import Images from './pages/Images';
import Videos from './pages/Videos';
import Music from './pages/Music';


const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn/>,
  },
  
  {
    path: "dashboard",
    element: <Dashboard/>,
  },
  
  {
    path: "locked",
    element: <Locked/>,
  },
  {
    path: "starred",
    element: <Starred/>,
  },
  {
    path: "storage",
    element: <Storage/>,
  },
  {
    path: "documents",
    element: <Documents/>,
  },
  {
    path: "images",
    element: <Images/>,
  },
  {
    path: "videos",
    element: <Videos/>,
  },
  {
    path: "music",
    element: <Music/>,
  },
]);

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