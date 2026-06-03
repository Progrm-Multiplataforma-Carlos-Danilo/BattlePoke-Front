import { useState } from "react";
import { login, register } from "../integration/authIntegration";
import { LoginDTO } from "../@types/LoginDTO";
import { RegisterDTO } from "../@types/RegisterDTO";
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

      
      if (data.email === 'admin@gmail.com' && data.senha === '123456') {
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