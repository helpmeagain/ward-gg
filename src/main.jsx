import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './routes/HomePage.jsx';
import MatchDetails from './routes/MatchDetails.jsx';
import Profile from './routes/Profile.jsx';
import BasePage from './components/BasePage.jsx';
import MasteryDetails from './routes/MasteryDetails.jsx'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasePage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/player/:playerId/username/:username/tag/:tag',
        element: <Profile />,
      },
      {
        path: '/match/:matchId/player/:playerId',
        element: <MatchDetails />,
      },
      {
        path: '/mastery/:playerId', 
        element: <MasteryDetails />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
