import { useState } from 'react';
import Header from "../Header";
import Profile from "../Profile";
import Search from "../Search";
import Matches from '../matchComponents/Matches';

function HomePage() {
    const [playerPUUID, setPlayerPUUID] = useState(null);
    const [playerTag, setPlayerTag] = useState('');

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 p-6 flex gap-6 ml-14">
                <div className="flex flex-col flex-1 gap-6">
                    <Search setPlayerPUUID={setPlayerPUUID} setPlayerTag={setPlayerTag} />
                    <Profile playerId={playerPUUID} tag={playerTag} />
                    <Matches playerId={playerPUUID} />
                </div>
                <aside className="w-80 space-y-6">
                    <h2 className="text-4xl italic "> Parte da direita </h2>
                    <p>Aqui virá informações</p>
                </aside>
            </main>
        </div>
    );
}

export default HomePage;
