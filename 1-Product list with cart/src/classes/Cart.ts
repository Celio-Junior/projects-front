// import { DessertDbProtocol } from "../interface/Dessert_db";
import { Product } from "./Product";

export class Cart {
  public products: Product[] = [];
  public quantityAll(): number {
    return this.products.reduce((total, { quantity }) => total + quantity, 0);
  }
  //criar um metodo que adicionar e outro que modifica
  add(productDessert: Product): void {
    this.products.push(productDessert);
  }

  // public haveProduct(product: string): boolean {
  //   return !!this.products.find(
  //     (productOrigin) => productOrigin.name === product,
  //   );
  // }

  //colocar pra retornar alguma coisa
  public ModifyQuatityProduct(product: string, mode: "+" | "-"): number {
    return this.products.reduce((isExistProduct, productOrigin) => {
      if (productOrigin.name === product) {
        const qtd =
          mode === "+"
            ? productOrigin.quantity + 1
            : productOrigin.quantity - 1;
        if (qtd > 0) {
          productOrigin.quantity = qtd;
        }
        isExistProduct = productOrigin.quantity;
      }
      return isExistProduct;
    }, 0);
  }

  public total() {
    return this.products.reduce((total, product) => {
      total += product.total;
      return total;
    }, 0);
  }
}
