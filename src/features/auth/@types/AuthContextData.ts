import {Pokemon} from '@/shared/types/pokemon';
export interface AuthContextData {
  isAuthenticated: boolean;
  user: string | null;
  userId: string | null;
  isLoading: boolean;
  displayName: string;
  avatar: string | null;
  team: Pokemon[];
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  updateDisplayName: (name: string) => Promise<void>;
  updateAvatar: (uri: string) => void;
  updateTeam: (team: Pokemon[]) => void;
}