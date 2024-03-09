import { useState, useEffect } from 'react';

const useMatchData = (matchId, playerId) => {
    const [matchData, setMatchData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [participantsData, setParticipantsData] = useState([]);
    const [mainPlayer, setMainPlayer] = useState(null);

    useEffect(() => {
        const fetchMatchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const proxy = "https://corsproxy.io/?";
                const apiUrl = "https://americas.api.riotgames.com/lol/match/v5/matches/";
                const apiKey = process.env.REACT_APP_API_KEY;

                const response = await fetch(proxy + apiUrl + matchId, {
                    headers: {
                        'X-Riot-Token': apiKey
                    }
                });

                if (!response.ok) {
                    throw new Error('Falha ao buscar dados da partida');
                }

                const data = await response.json();
                setMatchData(data);
            } catch (error) {
                setError('Erro ao buscar dados da partida');
                console.error('Erro ao buscar dados da partida:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (matchId) {
            fetchMatchData();
        }
    }, [matchId]);

    useEffect(() => {
        if (matchData) {
            const mappedParticipants = matchData.info.participants.map(participant => ({
                championName: participant.championName,
                champLevel: participant.champLevel,
                kills: participant.kills,
                assists: participant.assists,
                deaths: participant.deaths,
                win: participant.win,
                summoner1Id: participant.summoner1Id,
                summoner2Id: participant.summoner2Id,
                totalMinionsKilled: participant.totalMinionsKilled,
                visionScore: participant.visionScore,
                totalDamageDealt: participant.totalDamageDealt,
                lane: participant.lane,
                wardsPlaced: participant.wardsPlaced,
                item0: participant.item0,
                item1: participant.item1,
                item2: participant.item2,
                item3: participant.item3,
                item4: participant.item4,
                item5: participant.item5,
                item6: participant.item6,
                puuid: participant.puuid,
                riotId: `${participant.riotIdGameName}#${participant.riotIdTagline}`
            }));
            setParticipantsData(mappedParticipants);

            const player = mappedParticipants.find(player => player.puuid === playerId);
            setMainPlayer(player);
        }
    }, [matchData, playerId]);

    return { matchData, isLoading, error, participantsData, mainPlayer };
};

export default useMatchData;
