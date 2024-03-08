import { useState, useEffect } from 'react';

function Maestria({ playerId }) {
  const [maestriaData, setMaestriaData] = useState(null);
  const [championData, setChampionData] = useState(null);

  useEffect(() => {
    const fetchMaestriaData = async () => {
      try {
        const proxy = "https://corsproxy.io/?";
        const apiUrl = `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${playerId}/top?count=3`;
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
      fetchMaestriaData();
      fetchChampionData();
    }
  }, [playerId]);

  return (
    <div>
      <h1>Maestria dos Campeões</h1> <br />
      {maestriaData && championData && maestriaData.map((maestria, index) => {
        const championName = Object.values(championData).find(champion => champion.key === maestria.championId.toString());
        return (
          <div key={index}>
            {index === 0 ? <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName.id}_2.jpg`} alt="" srcset="" /> : null}
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.4.1/img/champion/${championName.id}.png`} className='h-10 w-10'/>
            <h2>Campeão: {championName.id}</h2>
            <img src={`https://lolg-cdn.porofessor.gg/img/s/masteries/lvl${maestria.championLevel}.png`} alt="" />
            <h2 className='text-green-700'>Pontos: {maestria.championPoints}</h2>
            <br />
          </div>
        );
      })}
    </div>
  );
}

export default Maestria;