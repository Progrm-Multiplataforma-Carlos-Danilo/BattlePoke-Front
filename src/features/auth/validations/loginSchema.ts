import * as yup from "yup";

// Login por nome de treinador (username) + senha — sem validação de e-mail.
export const loginSchema = yup.object({
   email: yup.string().required("Usuario obrigatorio"),
   senha: yup.string().required("Senha obrigatoria"),
});
