import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import BasePage from './components/BasePage.jsx';
import HomePage from './routes/HomePage.jsx';
import MatchDetails from './routes/MatchDetails.jsx';
import ProfilePage from './routes/ProfilePage.jsx';
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
        path: '/player/:playerId/tag/:tag',
        element: <ProfilePage />,
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
