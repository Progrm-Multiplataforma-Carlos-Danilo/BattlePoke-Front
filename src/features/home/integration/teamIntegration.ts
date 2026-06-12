import { httpClient } from '@sharedApi/httpClient';
import { getPokemon } from '@sharedApi/pokemonIntegration';
import { Pokemon } from '@sharedTypes/pokemon';

// O backend é dono dos IDs (time/capturados); a PokeAPI fornece os dados
// visuais. Buscamos a lista base uma vez e mapeamos os IDs para objetos Pokemon.
async function hydrateByIds(ids: number[]): Promise<Pokemon[]> {
  if (ids.length === 0) return [];
  const all = await getPokemon(151);
  const byId = new Map(all.map((p) => [p.id, p]));
  return ids
    .map((id) => byId.get(id))
    .filter((p): p is Pokemon => p !== undefined);
}

// Extrai uma lista de IDs numéricos da resposta do backend, tolerando
// formatos como [1,2], [{id:1}], [{ "pokemon-id": 1 }].
function extractIds(data: any): number[] {
  if (!Array.isArray(data)) return [];
  return data
    .map((item) =>
      typeof item === 'number'
        ? item
        : Number(item?.id ?? item?.['pokemon-id'] ?? item?.pokemonId)
    )
    .filter((n) => Number.isFinite(n));
}

export async function getTeam(userId: string): Promise<Pokemon[]> {
  const response = await httpClient.get('/pokemon/v1/team', {
    params: { 'user-id': userId },
  });
  return hydrateByIds(extractIds(response.data));
}

export async function updateTeam(
  userId: string,
  removedPokemon: number,
  newPokemon: number
): Promise<void> {
  await httpClient.put('/pokemon/v1/team', null, {
    params: {
      'user-id': userId,
      'removed-pokemon': removedPokemon,
      'new-pokemon': newPokemon,
    },
  });
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
