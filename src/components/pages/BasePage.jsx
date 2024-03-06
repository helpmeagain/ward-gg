import Header from "../Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function BasePage() {
  const [playerPUUID, setPlayerPUUID] = useState(null);
  const [playerTag, setPlayerTag] = useState('');
  return (
    <div className="min-h-screen flex flex-col">
      <Header setPlayerPUUID={setPlayerPUUID} setPlayerTag={setPlayerTag}/>
      <Outlet />
    </div>
  );
}

export default BasePage;
