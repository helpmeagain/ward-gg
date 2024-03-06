import { useState, useEffect } from 'react';
import { Badge } from "./ui/badge";

const Profile = ({ playerId, tag }) => {
    const [summonerData, setSummonerData] = useState(null);

    useEffect(() => {
        const fetchSummonerData = async () => {
            try {
                const proxy = "https://corsproxy.io/?"
                const apiUrl = "https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/"
                const apiKey = process.env.REACT_APP_API_KEY

                const response = await fetch(proxy + apiUrl + playerId, {
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
        <div>
            {summonerData && (
                <div className="flex items-center gap-6">
                    <div className="flex-col">
                        <img
                            className="h-36 w-36 rounded-full border-2"
                            src={`http://ddragon.leagueoflegends.com/cdn/14.4.1/img/profileicon/${summonerData.profileIconId}.png`}
                            alt="Profile Picture"
                        />
                        <div className="flex justify-center mt-1">
                            <Badge variant="secondary" className="BeaufortforLOLRegular text-[#F0E6D2]">{summonerData.summonerLevel}</Badge>
                        </div>
                    </div>

                    <h1 className="text-5xl text-[#F0E6D2] mb-6 BeaufortforLOLRegular"> {summonerData.name}
                        <span className="text-xl text-[#F0E6D2] text-muted-foreground"> #{tag.toUpperCase()}</span>
                    </h1>
                </div>
            )}
        </div>
    );
};

export default Profile;