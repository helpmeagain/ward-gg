import { useState, useEffect } from 'react';
import { Card } from './ui/card';

const MatchCard = ({ matchId, playerId }) => {
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
                kills: participant.kills,
                assists: participant.assists,
                deaths: participant.deaths,
                win: participant.win,
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

    if (isLoading) {
        return <div>Carregando...</div>;
    }

    if (error) {
        return <div>Ocorreu um erro: {error}</div>;
    }

    if (!matchData) {
        return null;
    }

    return (
        <div>
            {participantsData.length > 0 && mainPlayer && (
                <Card className={`flex w-6/12 pr-4 mb-2 ${mainPlayer.win ? 'border-[#0397AB] bg-blue-500/10' : 'border-red-500 bg-red-500/10'}`}>
                    {console.log(typeof (mainPlayer.win))}
                    {console.log(mainPlayer.win)}
                    {/* SPELLS */}
                    <div className='flex flex-col m-3 ml-5 justify-center'>
                        <img className='h-6 w-6 rounded-sm mb-1 border-2 border-[#32281E]'
                            src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/SummonerFlash.png"
                            alt="SummonerSpell"
                        />
                        <img className='h-6 w-6 rounded-sm border-2 border-[#32281E]'
                            src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/SummonerDot.png"
                            alt="SummonerSpell"
                        />
                    </div>

                    {/* CHAMP */}
                    <div className='flex-col mb-3 mt-3'>
                        <img className='w-14 h-14 rounded-full border-2 border-[#32281E]'
                            src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${mainPlayer.championName}.png`}
                            alt="ChampionPhoto"
                        />
                        <p className='text-sm Spiegel-SemiBold flex justify-center'>{mainPlayer.championName}</p>
                    </div>

                    {/* KDA */}
                    <div className='flex flex-col justify-center h-16 w-16 mt-5 ml-8 mr-8'>
                        <p className='flex BeaufortforLOL justify-center'>{`${mainPlayer.kills}/${mainPlayer.deaths}/${mainPlayer.assists}`}</p>
                        <p className='flex Spiegel-SemiBold justify-center'>{matchData.info.gameMode}</p>
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
            )}
        </div>
    );
};

export default MatchCard;
