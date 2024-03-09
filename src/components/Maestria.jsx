import { useState, useEffect } from 'react';
import { Card } from './ui/card';

function Maestria({ playerId }) {
  const [maestriaData, setMaestriaData] = useState(null);
  const [championData, setChampionData] = useState(null);
  const [visibleChampions, setVisibleChampions] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const proxy = "https://corsproxy.io/?";
        const apiUrl = `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${playerId}/top?count=${visibleChampions}`;
        const apiKey = process.env.REACT_APP_API_KEY;

        const response = await fetch(proxy + apiUrl, {
          headers: {
            'X-Riot-Token': apiKey
          }
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar dados do jogador');
        }

        const data = await response.json();
        setMaestriaData(data);
      } catch (error) {
        console.error('Erro ao buscar dados do jogador:', error);
      }
    };

    const fetchChampionData = async () => {
      try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/14.4.1/data/pt_BR/champion.json');
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
  }, [playerId, visibleChampions]);

  const handleVerMaisClick = async () => {
    try {
      const proxy = "https://corsproxy.io/?";
      const apiUrl = `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${playerId}/top?count=${visibleChampions + 3}`;
      const apiKey = process.env.REACT_APP_API_KEY;

      const response = await fetch(proxy + apiUrl, {
        headers: {
          'X-Riot-Token': apiKey
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao buscar mais dados do jogador');
      }

      const newData = await response.json();
      setMaestriaData((prevData) => [...prevData, ...newData]);
      setVisibleChampions((prevVisibleChampions) => prevVisibleChampions + 3);
    } catch (error) {
      console.error('Erro ao buscar mais dados do jogador:', error);
    }
  };

  return (
    <div>
      {maestriaData && championData && (
        <div className="w-96 flex flex-col gap-2">
          {maestriaData.map((maestria, index) => {
            const championName = Object.values(championData).find(
              (champion) => champion.key === maestria.championId.toString()
            );
            return (
              <div key={index}>
                {/* CARD WITH TEXT AND IMAGE */}
                {index === 0 ? (
                  <div className='image-container '>
                    <h2 className="text-3xl BeaufortforLOLRegular text-[#F0E6D2] text-center overlay-text">Champion Mastery</h2>
                    <img src={`https://lolg-cdn.porofessor.gg/img/d/champion-banners/${maestria.championId}.jpg`}
                      className='w-full h-auto mb-2 rounded-md opacity-50 border-2 border-neutral-400/60' />
                  </ div>
                ) : null}

                {/* CARD WITH MASTERY */}
                <Card className="flex flex-row items-center border-neutral-600 card-container p-2 rounded-md text-[#F0E6D2]">
                  <div className="flex items-center justify-center space-x-2 mx-4">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${championName.id}.png`}
                      alt=""
                      className="h-10 w-auto"
                    />
                    <img
                      src={`https://lolg-cdn.porofessor.gg/img/s/masteries/lvl${maestria.championLevel}.png`}
                      alt=""
                      className="h-7 w-auto"
                    />
                  </div>
                  <h2 className="w-36 font-bold mb-1 mr-4 text-[#F0E6D2] Spiegel-Regular overflow-hidden">{championName.name}</h2>
                  <h2 className="text-center text-sm text-muted-foreground font-semibold mb-1">Points: {maestria.championPoints.toLocaleString()}</h2>
                  <p className="text-center text-muted-foreground text-xs">
                    Last played: {new Date(maestria.lastPlayTime).toLocaleDateString()}
                  </p>
                </Card>
              </div>
            );
          })}
          <div className='flex justify-center'>
            <button onClick={handleVerMaisClick} className="h-auto w-28 bg-[#785A28] hover:bg-[#C89B3C] focus-visible:ring-[#32281E] text-[#F0E6D2] py-2 px-4 rounded mt-2">
              See more
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Maestria;
