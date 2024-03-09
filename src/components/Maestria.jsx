import { useState, useEffect } from 'react';

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {maestriaData.map((maestria, index) => {
            const championName = Object.values(championData).find(
              (champion) => champion.key === maestria.championId.toString()
            );
            return (
              <div key={index} className="card-container bg-gradient-to-b from-transparent to-gray-800 p-2 rounded-md shadow-md text-white">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${championName.id}.png`}
                    alt=""
                    className="h-8 w-8"
                  />
                  <img
                    src={`https://lolg-cdn.porofessor.gg/img/s/masteries/lvl${maestria.championLevel}.png`}
                    alt=""
                    className="h-6"
                  />
                </div>
                <h2 className="text-center font-bold text-sm mb-1">{championName.name}</h2>
                <h2 className="text-center text-green-600 font-semibold mb-1">Pontos: {maestria.championPoints}</h2>
                <p className="text-center text-yellow-500 text-xs">
                  Última vez jogado: {new Date(maestria.lastPlayTime).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
      <button
        onClick={handleVerMaisClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        Ver mais
      </button>
    </div>
  );
}

export default Maestria;
