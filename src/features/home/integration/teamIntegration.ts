import { httpClient } from '@sharedApi/httpClient';
import { Pokemon } from '@sharedTypes/pokemon';

// Shape de um pokémon como o backend retorna (team/capture): o id vem em
// `index` (string) e os stats vêm em `abilities` como { name, strength }.
interface BackendPokemon {
  index: string | number;
  name: string;
  image: string;
  types: string[];
  abilities?: { name: string; strength: number }[];
}

// Converte o pokémon do backend para o tipo Pokemon usado no app.
function mapBackendPokemon(p: BackendPokemon): Pokemon {
  return {
    id: Number(p.index),
    name: p.name,
    image: p.image,
    type: p.types ?? [],
    stats: (p.abilities ?? []).map((a) => ({ name: a.name, forca: a.strength })),
    height: 0,
    weight: 0,
    base_experience: 0,
    abilities: [],
  };
}

function toPokemonList(raw: any): Pokemon[] {
  return (Array.isArray(raw) ? raw : []).map(mapBackendPokemon);
}

// O GET /team retorna { team: [...], capture: [...] } — o time de batalha e a
// bolsa (capturados). Buscamos ambos numa única chamada.
export async function getTeamData(
  userId: string
): Promise<{ team: Pokemon[]; capture: Pokemon[] }> {
  const response = await httpClient.get('/pokemon/v1/team', {
    params: { 'user-id': userId },
  });
  const data = response.data ?? {};
  return {
    team: toPokemonList(data.team),
    capture: toPokemonList(data.capture),
  };
}

export async function getTeam(userId: string): Promise<Pokemon[]> {
  return (await getTeamData(userId)).team;
}

// Bolsa (pokémons capturados) do backend — fonte de verdade da lista de
// seleção da Home.
export async function getCaptured(userId: string): Promise<Pokemon[]> {
  return (await getTeamData(userId)).capture;
}

// IDs do time no backend (fonte de verdade para calcular o diff).
export async function getTeamIds(userId: string): Promise<number[]> {
  const team = await getTeam(userId);
  return team.map((p) => p.id);
}

// Substitui um pokémon do time por outro (modo "removed/new" do
// PUT /pokemon/v1/team). Exige que removedPokemon já esteja no time.
export async function updateTeam(
  userId: string,
  removedPokemon: number,
  newPokemon: number
): Promise<void> {
  // user-id vai na query; os ids vão no body (TeamUpdateRequest, camelCase).
  await httpClient.put(
    '/pokemon/v1/team',
    { removedPokemon, newPokemon },
    { params: { 'user-id': userId } }
  );
}

// Salva o time editado na Home. O backend já mantém um time de 5 pokémons e
// só permite trocar 1↔1, então comparamos o time atual com o novo e emitimos
// uma substituição (removed↔new) para cada pokémon que mudou.
export async function saveTeam(
  userId: string,
  newTeam: number[]
): Promise<void> {
  const current = await getTeamIds(userId);

  const removed = current.filter((id) => !newTeam.includes(id));
  const added = newTeam.filter((id) => !current.includes(id));

  for (let i = 0; i < removed.length && i < added.length; i++) {
    await updateTeam(userId, removed[i], added[i]);
  }
}

export async function addCaptured(
  userId: string,
  pokemonId: number
): Promise<void> {
  await httpClient.put('/pokemon/v1/captured', null, {
    params: { 'user-id': userId, 'pokemon-id': pokemonId },
  });
}

export async function removeCaptured(
  userId: string,
  pokemonId: number
): Promise<void> {
  await httpClient.delete('/pokemon/v1/captured', {
    params: { 'user-id': userId, 'pokemon-id': pokemonId },
  });
}
