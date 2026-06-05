import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon } from '@sharedTypes/pokemon';

interface AuthContextData {
  isAuthenticated: boolean;
  user: string | null;
  isLoading: boolean;
  displayName: string;
  avatar: string | null;
  team: Pokemon[];
  signIn: (username: string, password: string) => boolean;
  signOut: () => void;
  updateDisplayName: (name: string) => void;
  updateAvatar: (uri: string) => void;
  updateTeam: (team: Pokemon[]) => void;
}

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC6VDR_VTUVuA_0LONCjN23Vw3DDKOhyk3TyZKNt4c5jHf7FBo6uFpuSpDfMpQ7aISoIp6G6IGW9DB1AjUq7Sis2lZLCiS7IeTQzyuEyKB2lhKy-C3jAvWYr-dB2WhiVGr1mJ67YsMtuD1ISz4cI9hHJi7Xoe6I0Cfi5m5CaiTtmfyIuekxnGR3_-Z8n8qCs_KlLBYzWatXuhSYXEkwYdldekqyzqRDCQwRR8Ugm_M_m0iO4_oj0dP1GH3fpWwYBbI0q8CHUjBuVwxz';

function validateLogin(name: string, password: string): boolean {
  return name.trim().toLowerCase() === 'admin@gmail.com' && password.trim() === '123456';
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayName, setDisplayName] = useState('TRAINER');
  const [avatar, setAvatar] = useState<string | null>(null);
  const [team, setTeam] = useState<Pokemon[]>([]);

  useEffect(() => {
    async function loadStorageData() {
      const [storedUser, storedName, storedAvatar, storedTeam] = await Promise.all([
        AsyncStorage.getItem('@Auth:user'),
        AsyncStorage.getItem('@Auth:displayName'),
        AsyncStorage.getItem('@Auth:avatar'),
        AsyncStorage.getItem('@Auth:team'),
      ]);
      if (storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
      if (storedName) setDisplayName(storedName);
      if (storedAvatar) setAvatar(storedAvatar);
      if (storedTeam) setTeam(JSON.parse(storedTeam));
      setIsLoading(false);
    }
    loadStorageData();
  }, []);

  function signIn(username: string, password: string): boolean {
    const ok = validateLogin(username, password);
    if (!ok) return false;
    const name = username.trim();
    setUser(name);
    setIsAuthenticated(true);
    AsyncStorage.setItem('@Auth:user', name);
    return true;
  }

  function signOut() {
    setUser(null);
    setIsAuthenticated(false);
    setTeam([]);
    AsyncStorage.multiRemove(['@Auth:user', '@Auth:team']);
  }

  function updateDisplayName(name: string) {
    setDisplayName(name);
    AsyncStorage.setItem('@Auth:displayName', name);
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
      isAuthenticated, user, isLoading,
      displayName, avatar: avatar ?? DEFAULT_AVATAR, team,
      signIn, signOut, updateDisplayName, updateAvatar, updateTeam,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
