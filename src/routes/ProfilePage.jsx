import { useState, useEffect } from 'react';
import { Badge } from "../components/ui/badge";
import { useParams } from 'react-router-dom';
import Matches from '../components/match/Matches';
import Mastery from '../components/Mastery';

function ProfilePage() {
    const [summonerData, setSummonerData] = useState(null);
    const { playerId, username, tag } = useParams();

    useEffect(() => {
        const fetchSummonerData = async () => {
            try {
                const apiUrl = "/br1/lol/summoner/v4/summoners/by-puuid";
                const apiKey = process.env.REACT_APP_API_KEY;

                const response = await fetch(`${apiUrl}/${playerId}`, {
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
                setSummonerData(data);
                console.log("PROFILE - PUUID recebido:", data.puuid);
            } catch (error) {
                console.error('Erro ao buscar dados do jogador:', error);
            }
        };

        if (playerId) {
            fetchSummonerData();
        }
    }, [playerId]);

    return (
        <>
            {summonerData && (
                <div className='flex-1 p-6 flex gap-6 mx-14'>
                    <div className="flex flex-col flex-1 gap-6">
                        <div className='flex flex-row items-center'>
                            <div className='flex flex-col w-36 items-center'>
                                <img
                                    className="h-36 w-36 rounded-full border-2 mb-2"
                                    src={`http://ddragon.leagueoflegends.com/cdn/14.4.1/img/profileicon/${summonerData.profileIconId}.png`}
                                    alt="Profile Picture"
                                />
                                <Badge
                                    variant="secondary"
                                    className="BeaufortforLOLRegular text-[#F0E6D2]">
                                    {summonerData.summonerLevel}
                                </Badge>
                            </div>

                            <h1 className="text-5xl text-[#F0E6D2] mb-6 ml-5 BeaufortforLOLRegular"> {/* Nome do jogador */}
                                {summonerData.name}
                                <span className="text-xl text-[#F0E6D2] text-muted-foreground"> #{tag.toUpperCase()}</span>
                            </h1>
                        </div>
                        <Matches playerId={playerId} username={username} />
                    </div>

                    <aside className="w-30 space-y-6">
                        <Mastery playerId={playerId} />
                    </aside>
                </div>
            )}
        </>
    );
}

export default ProfilePage;