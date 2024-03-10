import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import jsonData from '../../assets/spell.json';

const MatchCard = ({ matchId, playerId, summonerId }) => {
    const [participantsData, setParticipantsData] = useState([]);
    const [mainPlayer, setMainPlayer] = useState(null);
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
                setError(error);
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
        try {
            if (matchData && playerId && summonerId) {
                const mappedParticipants = matchData.info.participants.map(participant => {
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
                        riotId: `${participant.riotIdGameName}#${participant.riotIdTagline}`
                    };
                });

                const player = mappedParticipants.find(player => player.summonerId === summonerId);
                if (!player) {
                    throw new Error(`Player ${summonerId} not founded`);
                }
                setParticipantsData(mappedParticipants);
                setMainPlayer(player);
            }
        } catch (error) {
            setError(error);
            console.error('Erro ao processar dados do jogador:', error);
        }
    }, [matchData, playerId, summonerId]);

    if (isLoading) {
        return <div>Carregando...</div>;
    }

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
        <>
            {participantsData.length > 0 && mainPlayer && (
                <Link to={`/match/${matchId}/player/${playerId}`} className="flex w-[550px] ">
                    <Card to={`/match/${matchId}/player/${playerId}`} className={`flex w-[550px] mt-2 ${mainPlayer.win ? 'border-[#0397AB] bg-blue-500/10' : 'border-red-500 bg-red-500/10'}`}>
                        {/* SPELLS */}
                        <div className='flex flex-col m-3 ml-5 justify-center'>
                            <img className='h-6 w-6 rounded-sm mb-1 border-2 border-[#32281E]'
                                src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/${jsonData[mainPlayer.summoner1Id]}.png`}
                                alt="SummonerSpell"
                            />
                            <img className='h-6 w-6 rounded-sm border-2 border-[#32281E]'
                                src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/${jsonData[mainPlayer.summoner2Id]}.png`}
                                alt="SummonerSpell"
                            />
                        </div>

                        {/* CHAMP */}
                        <div className='flex-col my-3 items-center justify-center'>
                            <img className='w-14 h-14 mb-1 items-center justify-center rounded-full border-2 border-[#32281E]'
                                src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${mainPlayer.championName}.png`}
                                alt="ChampionPhoto"
                            />
                            {/* <p className='text-sm Spiegel-Regular flex justify-center text-[#F0E6D2]'>{mainPlayer.championName}</p> */}
                        </div>

                        {/* KDA */}
                        <div className='flex flex-col justify-center h-16 w-10 mt-3 ml-7 mr-7'>
                            <p className='flex BeaufortforLOL justify-center text-[#F0E6D2]'>{`${mainPlayer.kills}/${mainPlayer.deaths}/${mainPlayer.assists}`}</p>
                            <p className='flex Spiegel-SemiBold justify-center text-xs text-[#F0E6D2]'>{matchData.info.gameMode}</p>
                        </div>

                        {/* CS */}
                        <div className='flex flex-col justify-center h-16 w-10 mr-7 mt-3'>
                            <p className='flex Spiegel-SemiBold justify-center text-xs text-muted-foreground'>{`${mainPlayer.visionScore}`} VS</p>
                            <p className='flex Spiegel-SemiBold justify-center text-xs text-muted-foreground'>{mainPlayer.totalMinionsKilled} CS</p>
                        </div>

                        {/* ITENS */}
                        <div className='flex flex-col justify-center mr-6 gap-1'>
                            <div className='flex justify-center gap-1'>
                                {[0, 1, 2].map((itemIndex) => (
                                    <img key={itemIndex} className='w-6 h-6 rounded-sm border-2 border-[#32281E]' src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${mainPlayer[`item${itemIndex}`]}.png`} alt="" />
                                ))}
                            </div>
                            <div className='flex justify-center gap-1'>
                                {[3, 4, 6].map((itemIndex) => (
                                    <img key={itemIndex} className='w-6 h-6 rounded-sm border-2 border-[#32281E]' src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/${mainPlayer[`item${itemIndex}`]}.png`} alt="" />
                                ))}
                            </div>
                        </div>

                        {/* TEAMMATES */}
                        <div className='flex flex-col justify-center gap-1'>
                            <div className='flex justify-center gap-1'>
                                {participantsData.slice(0, 5).map((player, index) => (
                                    <img key={index} className='w-6 h-6 rounded-sm border-2 border-[#32281E]' src={`https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/${player.championName}.png`} alt="" />
                                ))}
                            </div>
                            <div className='flex justify-center gap-1'>
                                {participantsData.slice(5, 10).map((player, index) => (
                                    <img key={index} className='w-6 h-6 rounded-sm border-2 border-[#32281E]' src={`https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/${player.championName}.png`} alt="" />
                                ))}
                            </div>
                        </div>
                    </Card>
                </Link>
            )}
        </>
    );
};

export default MatchCard;