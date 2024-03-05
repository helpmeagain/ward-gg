import { useState } from 'react';
import Header from "./components/Header";
import Profile from "./components/Profile";
import Search from "./components/Search";
import MatchCard from './components/MatchCard';

function App() {
  const [playerPUUID, setPlayerPUUID] = useState(null);
  const [playerTag, setPlayerTag] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 flex gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <h2 className="text-4xl italic"> Parte da esquerda </h2>
          <Search setPlayerPUUID={setPlayerPUUID} setPlayerTag={setPlayerTag} />
          <Profile playerId={playerPUUID} tag={playerTag} />
          <MatchCard />
          <p>Aqui virá informações</p>
          <p>Aqui virá informações</p>
          <p>Aqui virá informações</p>
        </div>
        <aside className="w-80 space-y-6">
          <h2 className="text-4xl italic "> Parte da direita </h2>
          <p>Aqui virá informações</p>
          <p>Aqui virá informações</p>
          <p>Aqui virá informações</p>
        </aside>
      </main>
    </div>
  );
}

export default App;
