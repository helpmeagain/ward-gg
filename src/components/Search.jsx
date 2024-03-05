import { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { VscSearch } from 'react-icons/vsc';

const Search = () => {
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [playerPUUID, setPlayerPUUID] = useState(null);

    const proxy = "https://corsproxy.io/?"
    const apiUrl = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
    const apiKey = process.env.REACT_APP_API_KEY

    useEffect(() => {
        if (playerPUUID !== null) {
            console.log(playerPUUID);
        }
    }, [playerPUUID]);

    const searchPlayer = async (gameName, tagLine) => {
        try {
            const encodedGameName = encodeURIComponent(gameName);
            const encodedTagLine = encodeURIComponent(tagLine);

            const response = await fetch(`${proxy}${apiUrl}${encodedGameName}/${encodedTagLine}`, {
                headers: {
                    'X-Riot-Token': apiKey
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPlayerPUUID(data.puuid);
            } else {
                console.error('Erro ao buscar o jogador');
            }
        } catch (error) {
            console.error('Erro ao buscar o jogador:', error);
        }
    };

    const handleSearch = async () => {
        if (gameName && tagLine) {
            await searchPlayer(gameName, tagLine);
        } else {
            console.error('Por favor, preencha ambos os campos antes de buscar');
        }
    };

    return (
        <div className="flex">
            <Input
                placeholder="Game Name"
                className="mr-1 w-56"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />
            <Input
                placeholder="Tag Line"
                className="mr-1 w-20"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
            />
            <Button className="bg-[#785A28] hover:bg-[#C89B3C]" onClick={handleSearch}>
                <VscSearch className="text-[#F0E6D2]" />
            </Button>
        </div>
    );
};

export default Search;
