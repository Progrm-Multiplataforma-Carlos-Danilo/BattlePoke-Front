import { useState } from "react";
import { login, register } from "../integration/authIntegration";
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

     async function handleLogin(
      data:LoginDTO
   ){

      const ok = signIn(data.email, data.senha);
      if (ok) {
         router.push('/(dashboard)/Home');
         return;
      }

  
      await login(
         data
      );

   }
    
   async function handleRegister(data:RegisterDTO){

      await register(
         data
      );

   }

   return {
      isRemembered,
      toggleRemember,
      handleLogin,
      handleRegister
   };
}