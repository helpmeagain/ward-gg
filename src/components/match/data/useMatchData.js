import { useState, useEffect } from "react";

const useMatchData = (matchId, summonerId) => {
  const [participantsData, setParticipantsData] = useState([]);
  const [mainPlayer, setMainPlayer] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const apiUrl = "/api/lol/match/v5/matches";
        const apiKey = process.env.REACT_APP_API_KEY;
        const response = await fetch(`${apiUrl}/${matchId}`, {
          headers: {
            "X-Riot-Token": apiKey,
          },
        });

        if (!response.ok) {
          let errorMessage = `Error ${response.status}: `;
          const errorData = await response.json();
          errorMessage += `${
            errorData?.status?.message || "An error occurred"
          }`;
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setMatchData(data);
        setGameMode(data.info.gameMode);
      } catch (error) {
        setError(error);
        console.error("Erro ao buscar dados da partida:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (matchId) {
      fetchMatchData();
    }
  }, [matchId]);

  useEffect(() => {
    try {
      if (matchData && summonerId) {
        const mappedParticipants = matchData.info.participants.map(
          (participant) => {
            return {
              puuid: participant.puuid,
              summonerId: participant.summonerId,
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
              riotId: `${participant.riotIdGameName} #${participant.riotIdTagline}`,
            };
          }
        );

        const player = mappedParticipants.find(
          (player) => player.puuid === summonerId
        );
        if (!player) {
          throw new Error(`Player ${summonerId} not founded`);
        }
        setParticipantsData(mappedParticipants);
        setMainPlayer(player);
      }
    } catch (error) {
      setError(error);
      console.error("Erro ao processar dados do jogador:", error);
    }
  }, [matchData, summonerId]);

  return {
    matchData,
    isLoading,
    error,
    participantsData,
    mainPlayer,
    gameMode,
  };
};

export default useMatchData;
