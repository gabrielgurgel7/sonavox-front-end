export default class RegisterForm {
  constructor(
    public name: string = "", // Inicia com estado vazio
    public email: string = "",
    public password: string = "",
    public confirmPassword: string = "",
  ) {}
}
