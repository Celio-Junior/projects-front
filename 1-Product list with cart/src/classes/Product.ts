import { ProductInterface } from "../interface/ProductInterface";

export class Product implements ProductInterface {
  public name: string;
  public quantity: number = 1;
  public price: number;

  constructor(name: string, priceUni: number) {
    this.name = name;
    this.price = priceUni;
  }
  get total(): number {
    return this.price * this.quantity;
  }
}
//talvez a mudança de nome
