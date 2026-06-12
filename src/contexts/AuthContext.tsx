import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon } from '@sharedTypes/pokemon';
import { LoginDTO } from '@/features/auth/@types/LoginDTO';
import { login as loginRequest } from '@/features/auth/integration/authIntegration';
import { getToken, getUserId, clearSession } from '@sharedApi/storage';
import {DEFAULT_AVATAR} from '@/constants/global'; 
import { AuthContextData} from '@/features/auth/@types/AuthContextData';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState('TRAINER');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [team, setTeam] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function loadStorageData() {
      const [storedUser, storedName, storedAvatar, storedTeam, storedToken, storedUserId] =
        await Promise.all([
          AsyncStorage.getItem('@Auth:user'),
          AsyncStorage.getItem('@Auth:displayName'),
          AsyncStorage.getItem('@Auth:avatar'),
          AsyncStorage.getItem('@Auth:team'),
          getToken(),
          getUserId(),
        ]);
      // Sessão válida só com token persistido (backend real).
      if (storedUser && storedToken) {
        setUser(storedUser);
        setUserId(storedUserId);
        setIsAuthenticated(true);
      }
      if (storedName) setDisplayName(storedName);
      if (storedAvatar) setAvatar(storedAvatar);
      if (storedTeam) setTeam(JSON.parse(storedTeam));
      setIsLoading(false);
    }
    loadStorageData();
  }, []);

  async function signIn(username: string, password: string): Promise<boolean> {
    const credentials: LoginDTO = { email: username.trim(), senha: password };
    const auth = await loginRequest(credentials);

    const name = username.trim();
    setUser(name);
    setUserId(auth.userId);
    setIsAuthenticated(true);
    await AsyncStorage.setItem('@Auth:user', name);
    return true;
  }

  function signOut() {
    setUser(null);
    setUserId(null);
    setIsAuthenticated(false);
    setTeam([]);
    AsyncStorage.multiRemove(['@Auth:user', '@Auth:team']);
    clearSession();
  }

  async function updateDisplayName(name: string) {
    // Apenas estado + persistência local. O PUT no backend é feito pelo
    // TrainerCard, que tem os stats atuais para enviar no mesmo request
    // (o endpoint /stats exige level/vitorias/derrotas, não aceita só o nome).
    setDisplayName(name);
    await AsyncStorage.setItem('@Auth:displayName', name);
  }

  function updateAvatar(uri: string) {
    setAvatar(uri);
    AsyncStorage.setItem('@Auth:avatar', uri);
  }

  function updateTeam(newTeam: Pokemon[]) {
    setTeam(newTeam);
    AsyncStorage.setItem('@Auth:team', JSON.stringify(newTeam));
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated, user, userId, isLoading,
      displayName, avatar: avatar ?? DEFAULT_AVATAR, team,
      signIn, signOut, updateDisplayName, updateAvatar, updateTeam,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
