import { helpers, required, email, minLength, maxLength, sameAs } from "@vuelidate/validators";

export const msg = {
  required: (field: string) => helpers.withMessage(`*${field} é obrigatório`, required),
  email: helpers.withMessage("*E-mail inválido", email),
  minLength: (field: string, min: number) =>
    helpers.withMessage(`*${field} deve ter pelo menos ${min} caracteres`, minLength(min)),
  maxLength: (field: string, max: number) =>
    helpers.withMessage(`*${field} deve ter no máximo ${max} caracteres`, maxLength(max)),
  sameAs: (field: string, ref: unknown) => helpers.withMessage(`*${field}`, sameAs(ref)),
};
