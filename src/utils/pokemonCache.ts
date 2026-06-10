import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPokemon } from "@sharedApi/pokemonIntegration";
import { Pokemon } from "@sharedTypes/pokemon";

const POKEMON_CACHE_KEY = '@Pokemon:randomList';

export async function getRandomPokemons(): Promise<Pokemon[]> {
  try {
    const cachedList = await AsyncStorage.getItem(POKEMON_CACHE_KEY);
    if (cachedList) {
      return JSON.parse(cachedList) as Pokemon[];
    }
  } catch (e) {
    console.error("Error reading from AsyncStorage:", e);
  }

  const data = await getPokemon(151);
  const pokemonRandom = data.sort(() => Math.random() - 0.5).slice(0, 5);

  try {
    await AsyncStorage.setItem(POKEMON_CACHE_KEY, JSON.stringify(pokemonRandom));
  } catch (e) {
    console.error("Error saving to AsyncStorage:", e);
  }

  return pokemonRandom;
}
