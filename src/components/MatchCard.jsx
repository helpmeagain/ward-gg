import { useState, useEffect } from 'react';
import { Card } from './ui/card';

const MatchCard = ({ matchId, playerId }) => {
    const [matchData, setMatchData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [participantsData, setParticipantsData] = useState([]);

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
                riotId: `${participant.riotIdGameName}#${participant.riotIdTagline}`
            }));
            setParticipantsData(mappedParticipants);
        }
    }, [matchData]);

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
            <Card className="flex w-6/12 border-[#0397AB]">
                {/* SPELLS */}
                <div className='flex flex-col m-3 ml-5 justify-center'>
                    <img className='h-5 w-5 rounded-sm mb-1'
                        src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/SummonerFlash.png"
                        alt="SummonerSpell"
                    />
                    <img className='h-5 w-5 rounded-sm'
                        src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/spell/SummonerDot.png"
                        alt="SummonerSpell"
                    />
                </div>

                {/* CHAMP */}
                <div className='flex-col mb-3 mt-3'>
                    <img className='w-14 h-14 rounded-full'
                        src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${participantsData[0].championName}.png`}
                        alt="ChampionPhoto"
                    />
                    <p className='text-sm Spiegel-SemiBold flex justify-center'>{participantsData[0].championName}</p>
                </div>

                {/* KDA */}
                <div className='flex flex-col justify-center m-3 ml-8 mr-8'>
                    <p className='flex BeaufortforLOL justify-center'>{`${participantsData[0].kills}/${participantsData[0].deaths}/${participantsData[0].assists}`}</p>
                    <p className='flex Spiegel-SemiBold justify-center'>{matchData.info.gameMode}</p>
                </div>

                {/* ITENS */}
                <div className='flex flex-col justify-center mr-2'>
                    <div className='flex justify-center gap-1'>
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/1001.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/1001.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/1001.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/1001.png" alt="" />
                    </div>
                    <div className='flex justify-center gap-1'>
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/1001.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/1001.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/1001.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.4.1/img/item/1001.png" alt="" />
                    </div>
                </div>

                {/* TEAMMATES */}
                <div className='flex flex-col justify-center'>
                    <div className='flex justify-center gap-1'>
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Ahri.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Ahri.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Ahri.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Ahri.png" alt="" />
                    </div>
                    <div className='flex justify-center gap-1'>
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Ahri.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Ahri.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Ahri.png" alt="" />
                        <img className='w-6 h-6'
                            src="https://ddragon.leagueoflegends.com/cdn/14.5.1/img/champion/Ahri.png" alt="" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default MatchCard;
