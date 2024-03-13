import { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import MatchCard from './MatchCard';

const Matches = ({ playerId, summonerId }) => {
    const [matchData, setMatchData] = useState(null);
    const [error, setError] = useState(null);
    const [loadedMatches, setLoadedMatches] = useState(5);

    useEffect(() => {
        const fetchMatchData = async () => {
            try {
                const apiUrl = "/api/lol/match/v5/matches/by-puuid";
                const apiKey = process.env.REACT_APP_API_KEY;
                const response = await fetch(`${apiUrl}/${playerId}/ids?start=0&count=${loadedMatches}`, {
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
                setMatchData(data);
            } catch (error) {
                console.error('Erro ao buscar dados do jogador:', error);
                setError(error);
            }
        };

        if (playerId) {
            fetchMatchData();
        }
    }, [playerId, loadedMatches]);

    const loadMoreMatches = () => {
        setLoadedMatches(prevLoadedMatches => prevLoadedMatches + 5);
    };

    if (error) {
        return (
            <Alert variant="destructive" className="mt-2">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error.message}
                </AlertDescription>
            </Alert>);
    }

    return (
        <div>
            {matchData && matchData.map(matchId => (
                <MatchCard key={matchId} matchId={matchId} summonerId={summonerId} />
            ))}
            <div className="mt-2 flex justify-center w-[582px]">
                <button className="Spiegel-Regular bg-[#785A28] hover:bg-[#C89B3C] focus-visible:ring-[#32281E] text-[#F0E6D2] py-2 px-4 rounded-lg" onClick={loadMoreMatches}>Load More</button>
            </div>
        </div>
    );
};

export default Matches;
