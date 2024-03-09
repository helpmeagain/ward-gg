import { useState, useEffect } from 'react';
import MatchCard from './MatchCard';

const Matches = ({ playerId, username }) => {
    const [matchData, setMatchData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const proxy = "https://corsproxy.io/?"
                const apiUrl = "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/"
                const apiKey = process.env.REACT_APP_API_KEY

                const response = await fetch(proxy + apiUrl + playerId + "/ids?start=0&count=5", {
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
                setError('Erro ao buscar dados da partida');
                console.error('Erro ao buscar dados do jogador:', error);
            }
        };

        if (playerId) {
            fetchMatchData();
        }
    }, [playerId]);

    if (error) {
        return (
            <Alert variant="destructive" className="mt-2">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error}
                </AlertDescription>
            </Alert>)
    }

    return (
        <div>
            {matchData && matchData.map(matchId => (
                <MatchCard key={matchId} playerId={playerId} matchId={matchId} username={username} />
            ))}
            {matchData && console.log("MATCHES - Dados das partidas:", matchData)}
        </div>
    )
}

export default Matches