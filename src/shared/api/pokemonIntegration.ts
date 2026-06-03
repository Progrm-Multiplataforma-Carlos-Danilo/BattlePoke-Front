import axios from 'axios'
import { Pokemon } from '@sharedTypes/pokemon'

const API_URL = axios.create({
  baseURL: 'https://pokeapi.co/api/v2'
})

export const getPokemon = async (limit = 151): Promise<Pokemon[]> => {
  const response = await API_URL.get(`/pokemon?limit=${limit}`);
  const list = response.data.results;

  const pokemonDetailWithNulls = await Promise.all(
    list.map(async (pokemon: { name: string; url: string }) => {
      try {
        const pokemonResponse = await axios.get(pokemon.url);
        const dadosPokemon = pokemonResponse.data;
        return {
          id: dadosPokemon.id,
          name: dadosPokemon.name,
          image: dadosPokemon.sprites.front_default,
          type: dadosPokemon.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
          stats: dadosPokemon.stats.map((s: any) => ({
            name: s.stat.name,
            forca: s.base_stat
          }))
        };
      } catch (err) {
        console.error('Error fetching pokemon URL:', pokemon.url, err);
        return null;
      }
    })
  );

  // filter out any failed fetches
  const pokemonDetail = pokemonDetailWithNulls.filter((p): p is Pokemon => p !== null);
  return pokemonDetail;
}
