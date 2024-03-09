import { useState, useEffect } from 'react';
import { Badge } from "../ui/badge";
import { useParams } from 'react-router-dom';
import Matches from '../matchComponents/Matches';
import Maestria from '../Maestria';


function Profile({ puuid, tagProfile }) {
    const [summonerData, setSummonerData] = useState(null);
    const { playerId, tag, username } = useParams()
    puuid = playerId
    tagProfile = tag

    useEffect(() => {
        const fetchSummonerData = async () => {
            try {
                const proxy = "https://corsproxy.io/?"
                const apiUrl = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/"
                const apiKey = process.env.REACT_APP_API_KEY

                const response = await fetch(proxy + apiUrl + puuid, {
                    headers: {
                        'X-Riot-Token': apiKey
                    }
                });
                if (!response.ok) {
                    throw new Error('Falha ao buscar dados do jogador');
                }
                const data = await response.json();
                setSummonerData(data);
                console.log(data.puuid)
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
                <>
                    <div className='flex-1 p-6 flex gap-6 ml-14'>
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

                                <h1 className="text-5xl text-[#F0E6D2] mb-6 ml-3 BeaufortforLOLRegular"> {/* Nome do jogador */}
                                    {summonerData.name}
                                    <span className="text-xl text-[#F0E6D2] text-muted-foreground"> #{tagProfile.toUpperCase()}</span>
                                </h1>
                            </div>
                            <Matches playerId={puuid} username={username}/>
                        </div>

                        <aside className="w-30 space-y-6">
                            <h2 className="text-4xl italic ">Maestria dos Campeões</h2>
                            <Maestria playerId={puuid} />
                        </aside>
                    </div>
                </>
            )}
        </>

    );
}

export default Profile