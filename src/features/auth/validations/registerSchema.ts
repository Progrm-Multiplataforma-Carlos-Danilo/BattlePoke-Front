import * as yup from "yup";

export const registerSchema = yup.object({
   email: yup.string().email("Email invalido").required("Email obrigatorio"),
   senha: yup.string().required("Senha obrigatoria"),
   confirmarSenha: yup.string()
     .oneOf([yup.ref('senha'), undefined], "As senhas devem ser iguais")
     .required("Confirmar senha obrigatoria"),
});