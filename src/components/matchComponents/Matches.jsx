import { useState, useEffect } from 'react';
import MatchCard from './MatchCard';

const Matches = ({ playerId }) => {
    const [matchData, setMatchData] = useState(null);

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const proxy = "https://corsproxy.io/?"
                const apiUrl = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
                const apiKey = process.env.REACT_APP_API_KEY

                const response = await fetch(proxy + apiUrl + playerId + "/ids?start=0&count=1", {
                    headers: {
                        'X-Riot-Token': apiKey
                    }
                });
                if (!response.ok) {
                    throw new Error('Falha ao buscar dados do jogador');
                }
                const data = await response.json();
                setMatchData(data);
            } catch (error) {
                console.error('Erro ao buscar dados do jogador:', error);
            }
        };

        if (playerId) {
            fetchMatchData();
        }
    }, [playerId]);

    return (
        <div>
            {matchData && matchData.map(matchId => (
                <MatchCard key={matchId} playerId={playerId} matchId={matchId} />
            ))}
        </div>
    )
}

export default Matches