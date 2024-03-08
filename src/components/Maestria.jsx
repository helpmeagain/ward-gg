import { useState, useEffect } from 'react';

function Maestria({ playerId }) {
  const [maestriaData, setMaestriaData] = useState(null);
  useEffect(() => {
    const fetchMaestriaData = async () => {
      try {
        const proxy = "https://corsproxy.io/?"
        const apiUrl = `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${playerId}/top?count=3`
        const apiKey = process.env.REACT_APP_API_KEY

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
        console.log(maestriaData)
      } catch (error) {
        console.error('Erro ao buscar dados do jogador:', error);
      }
    };

    if (playerId) {
      fetchMaestriaData();
    }
  }, [playerId]);

  return (
    <div>
      <h1>Maestria dos Campeões</h1> <br />
      {maestriaData && maestriaData.map((maestria, index) => (
        <div key={index}>
          <h2>Pontos: {maestria.championPoints}</h2>
          <h2>Nível: {maestria.championLevel}</h2>
        </div>
      ))}
    </div>
  );
}

export default Maestria;