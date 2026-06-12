import axios from 'axios';
import { API_BASE_URL } from './config';
import { getToken } from './storage';

// Cliente HTTP centralizado para a API backend (AWS).
export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

// Injeta o token salvo em toda requisição.
httpClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Normaliza o erro para uma mensagem amigável (usada nos toasts).
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Erro inesperado na comunicação com o servidor.';
    return Promise.reject(new Error(message));
  }
);
