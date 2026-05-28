import { useState } from "react";
import { login, register } from "../service/authService";
import { LoginDTO } from "../types/LoginDTO";
import { RegisterDTO } from "../types/RegisterDTO";
import { router } from 'expo-router';

//Lógica de autenticação
export function useLogin() {

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

      // Redirect locally if admin credentials are used
      if (data.email === 'admin@gmail.com' && data.senha === 'admin') {
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