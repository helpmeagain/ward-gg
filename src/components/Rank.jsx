import { useState, useEffect } from 'react';

function Rank({ summonerId }) {
    const [rankData, setRankData] = useState(null);

    useEffect(() => {
        const fetchSummonerData = async () => {
            try {
                const apiUrl = "/br1/lol/league/v4/entries/by-puuid";
                const apiKey = process.env.REACT_APP_API_KEY;

                const response = await fetch(`${apiUrl}/${summonerId}`, {
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
                setRankData(data);
            } catch (error) {
                console.error('Erro ao buscar dados do jogador:', error);
            }
        };

        if (summonerId) {
            fetchSummonerData();
        }
    }, [summonerId]);

    const soloDuoData = rankData && rankData.find(entry => entry.queueType === 'RANKED_SOLO_5x5');
    const flexData = rankData && rankData.find(entry => entry.queueType === 'RANKED_FLEX_SR');

    return (
        <div className='flex flex-row items-center gap-4'>
            {soloDuoData && (
                <div className='h-60 text-center'>
                    <img src={`/images/rank/Rank=${soloDuoData.tier.toLowerCase()}.png`} className='h-32  w-32' />
                    <p className='text-muted-foreground text-sm BeaufortforLOLRegular'>Ranked Solo/Duo</p>
                    <h1 className='text-[#F0E6D2] BeaufortforLOLRegular text-lg'>
                        {soloDuoData.tier.charAt(0).toUpperCase() + soloDuoData.tier.slice(1).toLowerCase() + " " + soloDuoData.rank}
                    </h1>
                    <p className='text-[#F0E6D2] BeaufortforLOLRegular'>
                        WR: <span className='text-[#0397AB]'>{soloDuoData.wins}W</span>/<span className='text-red-600'>{soloDuoData.losses}L</span>
                    </p>
                </div>
            )}
            {!soloDuoData && (
                <div className='h-60 text-center'>
                    <img src={`/images/rank/Rank=iron.png`} className='h-32  w-32 opacity-30' />
                    <p className='text-muted-foreground text-sm BeaufortforLOLRegular'>Ranked Solo/Duo</p>
                    <p className='text-[#F0E6D2] BeaufortforLOLRegular text-lg'>Unranked</p>
                </div>
            )}
            {flexData && (
                <div className='h-60 text-center'>
                    <img src={`/images/rank/Rank=${flexData.tier.toLowerCase()}.png`} className='h-32  w-32' />
                    <p className='text-muted-foreground text-sm BeaufortforLOLRegular'>Ranked Flex</p>
                    <h1 className='text-[#F0E6D2] BeaufortforLOLRegular text-lg'>
                        {flexData.tier.charAt(0).toUpperCase() + flexData.tier.slice(1).toLowerCase() + " " + flexData.rank}
                    </h1>
                    <p className='text-[#F0E6D2] BeaufortforLOLRegular'>
                        WR: <span className='text-[#0397AB]'>{flexData.wins}W</span>/<span className='text-red-600'>{flexData.losses}L</span>
                    </p>
                </div>
            )}
            {!flexData && (
                <div className='h-60 text-center'>
                    <img src={`/images/rank/Rank=iron.png`} className='h-32  w-32 opacity-30' />
                    <p className='text-muted-foreground text-sm BeaufortforLOLRegular'>Ranked Flex</p>
                    <p className='text-[#F0E6D2] BeaufortforLOLRegular text-lg'>Unranked</p>
                </div>
            )}
        </div>
    );
}

export default Rank;
