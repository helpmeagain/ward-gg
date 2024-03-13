import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import BasePage from './components/BasePage.jsx';
import HomePage from './routes/HomePage.jsx';
import MatchPage from './routes/MatchPage.jsx';
import ProfilePage from './routes/ProfilePage.jsx';
import MasteryPage from './routes/MasteryPage.jsx';

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
        path: '/player/:playerId/tag/:tag',
        element: <ProfilePage />,
      },
      {
        path: '/match/:matchId/summoner/:summonerId',
        element: <MatchPage />,
      },
      {
        path: '/mastery/:playerId',
        element: <MasteryPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
