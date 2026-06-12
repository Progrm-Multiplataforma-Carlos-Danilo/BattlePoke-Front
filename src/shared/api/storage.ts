import AsyncStorage from '@react-native-async-storage/async-storage';

// Persistência da sessão do usuário (token + userId).
// Segue o padrão de chaves '@Auth:*' já usado no AuthContext.

const TOKEN_KEY = '@Auth:token';
const USER_ID_KEY = '@Auth:userId';

export interface Session {
  token: string;
  userId: string;
}

export async function saveSession({ token, userId }: Session): Promise<void> {
  await AsyncStorage.multiSet([
    [TOKEN_KEY, token],
    [USER_ID_KEY, userId],
  ]);
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(TOKEN_KEY);
}

export async function getUserId(): Promise<string | null> {
  return AsyncStorage.getItem(USER_ID_KEY);
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_ID_KEY]);
}
