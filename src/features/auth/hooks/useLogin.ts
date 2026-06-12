import { useState } from "react";
import Toast from 'react-native-toast-message';
import { register } from "../integration/authIntegration";
import { LoginDTO } from "../@types/LoginDTO";
import { RegisterDTO } from "../@types/RegisterDTO";
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

//Lógica de autenticação
export function useLogin() {

   const { signIn } = useAuth();

   const [
      isRemembered,
      setIsRemembered
   ] = useState(false);

   function toggleRemember(){

      setIsRemembered(
         old => !old
      );
   }

   async function handleLogin(data: LoginDTO) {
      try {
         await signIn(data.email, data.senha);
         router.push('/(dashboard)/Home');
      } catch (err) {
         Toast.show({
            type: 'error',
            text1: 'Falha no login',
            text2: err instanceof Error ? err.message : 'Verifique suas credenciais.',
         });
      }
   }

   async function handleRegister(data: RegisterDTO) {
      try {
         await register(data);
         Toast.show({
            type: 'success',
            text1: 'Conta criada!',
            text2: 'Faça login para começar.',
         });
         router.push('/(auth)/Login');
      } catch (err) {
         Toast.show({
            type: 'error',
            text1: 'Falha no registro',
            text2: err instanceof Error ? err.message : 'Tente novamente.',
         });
      }
   }

   return {
      isRemembered,
      toggleRemember,
      handleLogin,
      handleRegister
   };
}
