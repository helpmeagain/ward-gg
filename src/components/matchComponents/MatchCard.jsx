import { Link } from 'react-router-dom';
import { Card } from '../ui/card';
import useMatchData from './useMatchData';
import jsonData from '../../assets/spell.json';

const MatchCard = ({ matchId, playerId }) => {
    const { matchData, isLoading, error, participantsData, mainPlayer } = useMatchData(matchId, playerId);

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
        <>
            {participantsData.length > 0 && mainPlayer && (
                <Link to={`/match/${matchId}/player/${playerId}}`} className="card-link">
                    <Card className={`flex w-7/12 mt-2 ${mainPlayer.win ? 'border-[#0397AB] bg-blue-500/10' : 'border-red-500 bg-red-500/10'}`}>
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
                        <div className='flex-col mb-3 mt-3'>
                            <img className='w-14 h-14 mb-1 rounded-full border-2 border-[#32281E]'
                                src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${mainPlayer.championName}.png`}
                                alt="ChampionPhoto"
                            />
                            <p className='text-sm Spiegel-Regular flex justify-center text-[#F0E6D2]'>{mainPlayer.championName}</p>
                        </div>

                        {/* KDA */}
                        <div className='flex flex-col justify-center h-16 w-10 mt-5 ml-7 mr-7'>
                            <p className='flex BeaufortforLOL justify-center text-[#F0E6D2]'>{`${mainPlayer.kills}/${mainPlayer.deaths}/${mainPlayer.assists}`}</p>
                            <p className='flex Spiegel-SemiBold justify-center text-xs text-[#F0E6D2]'>{matchData.info.gameMode}</p>
                        </div>

                        {/* CS */}
                        <div className='flex flex-col justify-center h-16 w-10 mr-7 mt-5'>
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