import { Link } from 'react-router-dom';
import { Card } from '../ui/card';
import { IoReload } from "react-icons/io5";
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import jsonData from '../../assets/spell.json';
import useMatchData from './data/useMatchData';

const MatchCard = ({ matchId, summonerId }) => {
    const { participantsData, mainPlayer, error, isLoading, gameMode } = useMatchData(matchId, summonerId);

    if (isLoading) {
        return <div>
            <Card className="flex flew-row items-center w-[550px] mt-2 p-5 gap-2">
                <IoReload />
                <p className='text-[#F0E6D2] Spiegel-Regular'>  Carregando...</p>
            </Card>
        </div>;
    }

    if (error) {
        return (
            <Alert variant="destructive" className="mt-2 w-[550px]">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    {error.message}
                </AlertDescription>
            </Alert>);
    }

    return (
        <>
            {participantsData.length > 0 && mainPlayer && (
                <Link to={`/match/${matchId}/summoner/${summonerId}`} className="flex w-[550px] ">
                    <Card className={`flex w-[550px] mt-2 ${mainPlayer.win ? 'border-[#0397AB] bg-blue-500/10' : 'border-red-500 bg-red-500/10'}`}>
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
                        </div>

                        {/* KDA */}
                        <div className='flex flex-col justify-center h-16 w-10 mt-3 ml-7 mr-7'>
                            <p className='flex BeaufortforLOL justify-center text-[#F0E6D2]'>{`${mainPlayer.kills}/${mainPlayer.deaths}/${mainPlayer.assists}`}</p>
                            <p className='flex Spiegel-SemiBold justify-center text-xs text-[#F0E6D2]'>{gameMode}</p>
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