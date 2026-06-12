import { httpClient } from '@sharedApi/httpClient';
import { saveSession } from '@sharedApi/storage';
import { LoginDTO } from '../@types/LoginDTO';
import { RegisterDTO } from '../@types/RegisterDTO';
import { AuthResponse } from '../@types/AuthResponse';

// O front usa os campos email/senha; o backend espera username/password.
function toCredentials(data: LoginDTO | RegisterDTO) {
  return { username: data.email, password: data.senha };
}

export async function register(data: RegisterDTO): Promise<void> {
  await httpClient.post('/auth/v1/register', toCredentials(data));
}

export async function login(data: LoginDTO): Promise<AuthResponse> {
  const response = await httpClient.post<AuthResponse>(
    '/auth/v1/login',
    toCredentials(data)
  );
  const auth = response.data;
  await saveSession({ token: auth.token, userId: auth.userId });
  return auth;
}
