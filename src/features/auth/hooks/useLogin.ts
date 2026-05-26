import { useState } from "react";
import { login, register } from "../service/authService";
import { LoginDTO } from "../types/LoginDTO";
import { RegisterDTO } from "../types/RegisterDTO";

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