import api from "@/shared/api/axios";
import {LoginDTO} from "../@types/LoginDTO";
import {RegisterDTO} from "../@types/RegisterDTO";

export async function login(
   data:LoginDTO
){

   return api.post(
      "/login",
      {
         data
      }
   );
}

export async function register(
   data:RegisterDTO
){

   return api.post(
      "/register",
      {
         data
      }
   );
}