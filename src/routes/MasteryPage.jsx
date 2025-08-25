import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';
import { Card } from '@/components/ui/card';

function MasteryPage() {
    const { playerId } = useParams();
    const [maestriaData, setMaestriaData] = useState(null);
    const [championData, setChampionData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `/br1/lol/champion-mastery/v4/champion-masteries/by-puuid`;
                const apiKey = process.env.REACT_APP_API_KEY;

                const response = await fetch(`${apiUrl}/${playerId}/`, {
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
                setMaestriaData(data);
            } catch (error) {
                console.error('Erro ao buscar dados do jogador:', error);
            }
        };

        const fetchChampionData = async () => {
            try {
                const response = await fetch('https://ddragon.leagueoflegends.com/cdn/15.16.1/data/pt_BR/champion.json');
                if (!response.ok) {
                    throw new Error('Falha ao buscar dados dos campeões');
                }
                const data = await response.json();
                setChampionData(data.data);
            } catch (error) {
                console.error('Erro ao buscar dados dos campeões:', error);
            }
        };

        if (playerId) {
            fetchData();
            fetchChampionData();
        }
    }, [playerId]);

    return (
        <div className='flex m-2 h-full'>
            {maestriaData && championData && (
                <Card className={`p-2 bg-blue-500/10 mx-auto h-auto w-8/12`}>
                    <Table className={" Spiegel-Regular text-center text-[#F0E6D2]"}>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-center"></TableHead>
                                <TableHead className="text-center">Champion</TableHead>
                                <TableHead className="text-center">Level</TableHead>
                                <TableHead className="text-center">Points</TableHead>
                                <TableHead className="text-center">Token</TableHead>
                                <TableHead className="text-center">Last played</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {maestriaData.map((maestria, index) => {
                                const champion = Object.values(championData).find(champ => champ.key === maestria.championId.toString());
                                return (
                                    <TableRow key={index}>
                                        <TableCell className="text-center">{champion ? <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/15.16.1/img/champion/${champion.id}.png`}
                                            alt=""
                                            className="h-10 w-auto"
                                        /> : 'Unknown'}</TableCell>
                                        <TableCell className="text-center">{champion ? champion.name : 'Unknown'}</TableCell>
                                        <TableCell className="text-center">{maestria.championLevel}</TableCell>
                                        <TableCell className="text-center">{maestria.championPoints}</TableCell>
                                        <TableCell className="text-center"> {maestria.tokensEarned} </TableCell>
                                        <TableCell className="text-center">{new Date(maestria.lastPlayTime).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Card>
            )}
        </div>
    );
}

export default MasteryPage;
