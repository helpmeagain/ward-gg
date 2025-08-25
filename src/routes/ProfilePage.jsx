import { useState, useEffect } from 'react';
import { Badge } from "../components/ui/badge";
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import Matches from '../components/match/Matches';
import Mastery from '../components/Mastery';
import Rank from '../components/Rank';

function ProfilePage() {
    const [summonerData, setSummonerData] = useState(null);
    const [accountData, setAccountData] = useState(null);
    const { playerId } = useParams();

    useEffect(() => {
       const fetchSummonerData = async () => {
            try {
                const apiKey = process.env.REACT_APP_API_KEY;

                const summonerUrl = `/br1/lol/summoner/v4/summoners/by-puuid/${playerId}`;
                const summonerResponse = await fetch(summonerUrl, {
                    headers: { 'X-Riot-Token': apiKey }
                });
                if (!summonerResponse.ok) {
                    let errorMessage = `Error ${summonerResponse.status}: `;
                    const errorData = await summonerResponse.json();
                    errorMessage += `${errorData?.status?.message || 'An error occurred'}`;
                    throw new Error(errorMessage);
                }
                const summoner = await summonerResponse.json();
                setSummonerData(summoner);

                const accountUrl = `/api/riot/account/v1/accounts/by-puuid/${playerId}`;
                const accountResponse = await fetch(accountUrl, {
                    headers: { 'X-Riot-Token': apiKey }
                });
                if (!accountResponse.ok) {
                    let errorMessage = `Error ${accountResponse.status}: `;
                    const errorData = await accountResponse.json();
                    errorMessage += `${errorData?.status?.message || 'An error occurred'}`;
                    throw new Error(errorMessage);
                }
                const account = await accountResponse.json();
                setAccountData(account);
            } catch (error) {
                console.error('Erro ao buscar dados do jogador:', error);
            }
        };

        if (playerId) {
            fetchSummonerData();
        }
    }, [playerId]);

    return (
        <>
            {summonerData && accountData && (
                <div className='flex-1 p-4 flex gap-6 mx-14'>
                    <div className="flex flex-col flex-1 gap-1">
                        <Card className='flex flex-row items-center justify-between p-6 pt-10 w-[800px] h-72 rounded-lg bg-stone-900/15'>
                            <div className='flex flex-col w-36 items-center ml-2'>
                                <img
                                    className="h-36 w-36 rounded-full border-2 mb-2"
                                    src={`http://ddragon.leagueoflegends.com/cdn/15.16.1/img/profileicon/${summonerData.profileIconId}.png`}
                                    alt="Profile Picture"
                                />
                                <Badge
                                    variant="secondary"
                                    className="BeaufortforLOLRegular text-[#F0E6D2]">
                                    {summonerData.summonerLevel}
                                </Badge>
                            </div>

                            <div>
                                <h1 className="text-4xl text-[#F0E6D2] ml-2 mb-5 BeaufortforLOLRegular"> {/* Nome do jogador */}
                                    {accountData.gameName}
                                    <span className="text-base text-[#F0E6D2] text-muted-foreground"> #{accountData.tagLine.toUpperCase()}</span>
                                </h1>
                            </div>

                            <div className="ml-auto mr-2 mt-3">
                                <Rank summonerId={summonerData.puuid} />
                            </div>
                        </Card>
                        <Matches playerId={playerId} summonerId={summonerData.puuid} />
                    </div>

                    <aside className="space-y-6">
                        <Mastery playerId={playerId} />
                    </aside>
                </div>
            )}
        </>
    );
}

export default ProfilePage;
