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
    console.error("Erro ao ler do AsyncStorage:", e);
  }
  return null;
}

export async function removeCachedPokemon(pokemonId: number): Promise<void> {
  try {
    const cached = await AsyncStorage.getItem(POKEMON_CACHE_KEY);
    if (cached) {
      const list = JSON.parse(cached) as Pokemon[];
      await AsyncStorage.setItem(
        POKEMON_CACHE_KEY,
        JSON.stringify(list.filter((p) => p.id !== pokemonId))
      );
    }
  } catch (e) {
    console.error("Erro ao remover do AsyncStorage:", e);
  }
}

export async function captureRandomPokemons(count: number = 5): Promise<Pokemon[]> {
  const data = await getPokemon(151);
  return data.sort(() => Math.random() - 0.5).slice(0, count);
}
