import Header from "./Header";
import { Outlet, useLocation  } from "react-router-dom";
import { useState } from "react";

function BasePage() {
  const [playerPUUID, setPlayerPUUID] = useState(null);
  const [playerTag, setPlayerTag] = useState('');

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Header setPlayerPUUID={setPlayerPUUID} setPlayerTag={setPlayerTag} isHomePage={isHomePage}/>
      <Outlet />
    </div>
  );
}

export default BasePage;
