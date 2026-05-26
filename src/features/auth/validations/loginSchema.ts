import * as yup from "yup";

//Só validação de email e senha
export const loginSchema = yup.object({
   email: yup.string().email("Email invalido").required("Email obrigatorio"),
   senha: yup.string().required("Senha obrigatoria"),
});