import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { VscSearch } from 'react-icons/vsc';
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from './ui/alert';

const Search = () => {
    const [gameName, setGameName] = useState('');
    const [tagLine, setTagLine] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const searchPlayer = async (gameName, tagLine) => {
        try {
            const apiUrl = "/api/riot/account/v1/accounts/by-riot-id";
            const apiKey = process.env.REACT_APP_API_KEY;
            const response = await fetch(`${apiUrl}/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`, {
                headers: {
                    'X-Riot-Token': apiKey
                }
            });

            if (!response.ok) {
                let errorMessage = `Error ${response.status}: `;
                const errorData = await response.json();
                errorMessage += `${errorData?.status?.message || 'An error occurred'}`;
                throw new Error(errorMessage);
            }

            const data = await response.json();
            navigate(`/player/${data.puuid}/username/${gameName}/tag/${tagLine}`);
        } catch (error) {
            setError(error);
            console.error('Erro ao buscar o jogador:', error);
        }
    };

    const handleSearch = async () => {
        try {
            if (gameName && tagLine) {
                await searchPlayer(gameName, tagLine);
            } else {
                throw new Error('The fields are empty');
            }
        } catch (error) {
            setError(error);
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex items-center">
            <Input
                placeholder="Summoner Name"
                className="mr-1 w-56 focus-visible:ring-[#785A28] BeaufortforLOLRegular select-none"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <Input
                placeholder="Tag Line"
                className="mr-1 w-20 focus-visible:ring-[#785A28] BeaufortforLOLRegular select-none"
                value={tagLine}
                onChange={(e) => setTagLine(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <Button className="bg-[#785A28] hover:bg-[#C89B3C] focus-visible:ring-[#32281E] mr-3" onClick={handleSearch}>
                <VscSearch className="text-[#F0E6D2]" />
            </Button>
            {error && (
                <div>
                    {/* <p className='Spiegel-Regular ml-2 text-red-600 text-sm'>{error.message}</p> */}
                    <Alert variant="destructive" className="flex items-center Spiegel-Regular text-sm h-10">
                        <AlertDescription>
                            <div className="flex items-center">
                                <MdErrorOutline className="mr-1 h-4 w-4" />
                                {error.message}
                            </div>
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
};

export default Search;
