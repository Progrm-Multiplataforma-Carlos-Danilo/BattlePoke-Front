import { httpClient } from '@sharedApi/httpClient';
import { Profile } from '../../../shared/types/Profile';

export async function getProfile(userId: string): Promise<Profile> {
  const response = await httpClient.get(`/auth/v1/stats/${userId}`);
  return { userId, ...response.data };
}

export type ProfileStats = Pick<Profile, 'level' | 'vitorias' | 'derrotas'>;

// Único endpoint de atualização confirmado na coleção (Poke-Mongo-Colection.json):
// PUT /auth/v1/stats/{userId}. Na coleção os valores vão como string.
// O backend é Mongo; se ele fizer update por documento, enviar `username` aqui
// também atualiza o nome. Caso ignore o campo, os stats seguem funcionando.
export async function updateProfile(
  userId: string,
  data: Partial<ProfileStats> & { username?: string }
): Promise<void> {
  const payload: Record<string, string> = {};
  if (data.level !== undefined) payload.level = String(data.level);
  if (data.vitorias !== undefined) payload.vitorias = String(data.vitorias);
  if (data.derrotas !== undefined) payload.derrotas = String(data.derrotas);
  if (data.username !== undefined) payload.username = data.username;
  await httpClient.put(`/auth/v1/stats/${userId}`, payload);
}
