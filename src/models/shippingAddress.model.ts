export class ShippingAddress {
  constructor(
    public street: string = "",
    public number: string = "",
    public complement: string = "",
    public neighborhood: string = "",
    public city: string = "",
    public state: string = "",
    public country: string = "BR",
    public zipCode: string = "",
  ) {}
}
