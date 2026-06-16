import AsyncStorage from '@react-native-async-storage/async-storage';
import { getPokemon } from "@sharedApi/pokemonIntegration";
import { Pokemon } from "@sharedTypes/pokemon";

const POKEMON_CACHE_KEY = '@Pokemon:randomList';

export async function getCachedPokemons(): Promise<Pokemon[] | null> {
  try {
    const cachedList = await AsyncStorage.getItem(POKEMON_CACHE_KEY);
    if (cachedList) {
      return JSON.parse(cachedList) as Pokemon[];
    }
  } catch (e) {
    console.error("Error reading from AsyncStorage:", e);
  }
  return null;
}

export async function captureRandomPokemons(): Promise<Pokemon[]> {
  const data = await getPokemon(151);
  const pokemonRandom = data.sort(() => Math.random() - 0.5).slice(0, 1);

  let currentList: Pokemon[] = [];
  try {
    const cachedList = await AsyncStorage.getItem(POKEMON_CACHE_KEY);
    if (cachedList) {
      currentList = JSON.parse(cachedList) as Pokemon[];
    }
  } catch (e) {
    console.error("Error reading from AsyncStorage:", e);
  }

  const updatedList = [...currentList, ...pokemonRandom];

  try {
    await AsyncStorage.setItem(POKEMON_CACHE_KEY, JSON.stringify(updatedList));
  } catch (e) {
    console.error("Error saving to AsyncStorage:", e);
  }

  return updatedList;
}
