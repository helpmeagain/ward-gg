import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { VscSearch } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom'; 

const Search = ({ setPlayerPUUID, setPlayerTag }) => {
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const navigate = useNavigate();

    const proxy = "https://corsproxy.io/?";
    const apiUrl = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/";
    const apiKey = process.env.REACT_APP_API_KEY;

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
                setPlayerTag(tagLine);
                navigate(`/player/${data.puuid}/tag/${tagLine}`); 
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
                className="mr-1 w-56 focus-visible:ring-[#785A28] BeaufortforLOLRegular"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />
            <Input
                placeholder="Tag Line"
                className="mr-1 w-20 focus-visible:ring-[#785A28] BeaufortforLOLRegular"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
            />
            <Button className="bg-[#785A28] hover:bg-[#C89B3C] focus-visible:ring-[#32281E]" onClick={handleSearch}>
                <VscSearch className="text-[#F0E6D2]" />
            </Button>
        </div>
    );
};

export default Search;
