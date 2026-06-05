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
        const d = pokemonResponse.data;

        return {
          id: d.id,
          name: d.name,
          image: d.sprites.front_default,
          type: d.types.map((t: { type: { name: string } }) => t.type.name),
          stats: d.stats.map((s: any) => ({
            name: s.stat.name,
            forca: s.base_stat,
          })),
          height: d.height,
          weight: d.weight,
          base_experience: d.base_experience,
          abilities: d.abilities.map((a: any) => ({
            name: a.ability.name,
            isHidden: a.is_hidden,
          })),
        } as Pokemon;
      } catch (err) {
        console.error('Error fetching pokemon URL:', pokemon.url, err);
        return null;
      }
    })
  );

  return pokemonDetailWithNulls.filter((p): p is Pokemon => p !== null);
}

function extractEvolutionNames(chain: any): string[] {
  const names: string[] = [chain.species.name];
  for (const next of chain.evolves_to) {
    names.push(...extractEvolutionNames(next));
  }
  return names;
}

export const getPokemonDetails = async (pokemon: Pokemon): Promise<Pokemon> => {
  try {
    const [speciesRes, ...typeRes] = await Promise.all([
      API_URL.get(`/pokemon-species/${pokemon.id}`),
      ...pokemon.type.map((t) => API_URL.get(`/type/${t}`)),
    ]);

    const species = speciesRes.data;

    const descriptionEntry = species.flavor_text_entries
      .find((e: any) => e.language.name === 'en');
    const description = descriptionEntry
      ? descriptionEntry.flavor_text.replace(/\f|\n/g, ' ')
      : undefined;

    const category = species.genera
      ?.find((g: any) => g.language.name === 'en')
      ?.genus;

    const evolutionChainRes = await axios.get(species.evolution_chain.url);
    const evolutionChain = extractEvolutionNames(evolutionChainRes.data.chain);

    const weaknesses = Array.from(new Set(
      typeRes.flatMap((res) =>
        res.data.damage_relations.double_damage_from.map((t: any) => t.name)
      )
    )) as string[];

    return { ...pokemon, description, category, evolutionChain, weaknesses };
  } catch (err) {
    console.error('Error fetching pokemon details:', err);
    return pokemon;
  }
}
