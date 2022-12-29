import axios from 'axios';
import { useQuery } from 'react-query';

function fetchGames() {
  return axios.get('http://localhost:1337/api/games');
}

export default function useGameData() {
  return useQuery('games', fetchGames, {
    select: (data) => data.data.data.map((game) => game),
  });
}
