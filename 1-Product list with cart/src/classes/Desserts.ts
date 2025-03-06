import productView from "../components/product-view";
import productCard from "../components/product-card";
import { DessertDbProtocol } from "./../interface/Dessert_db";
import { Cart } from "./Cart";
import { Product } from "./Product";
import ProductOrder from "../components/product-order";

const eleAmountCart = document.querySelector("#products-amount") as Element;
const eleProductsDesserts = document.querySelector(".products") as Element;
const productsAccount = document.querySelector("#products-account") as Element;
const productsOrderElement = document.querySelector(
  "#products-order",
) as Element;
const eleImgEmpty = document.querySelector(
  "#img-empty-itens",
) as HTMLDivElement;

export class Desserts {
  private deserrts: DessertDbProtocol[] = [];
  private readonly pathDb: string = "./assets/database/data.json";
  constructor(private cart: Cart) {}

  async init() {
    await this.loadingDesserts();
    this.dessertAdd();
    this.removeElementDessert();
    this.buttonBuyEvent();
  }

  async loadingDesserts() {
    const response = await fetch(this.pathDb);
    this.deserrts = await response.json();

    this.deserrts.forEach((dessertDate: DessertDbProtocol) => {
      this.createElementDessert(dessertDate);
    });
  }

  dessertsCartConfirmed() {
    this.cart.products.forEach(({ name, price, total, quantity }) => {
      const eleProductOrder = document.createElement("div");
      eleProductOrder.classList.add("card-order");
      // eleProductOrder.setAttribute("data-name", name);
      const productSearched = this.deserrts.find(
        (product) => product.name === name,
      ) as DessertDbProtocol;
      eleProductOrder.innerHTML = ProductOrder(
        name,
        price,
        total,
        quantity,
        productSearched.image.thumbnail,
      );
      productsOrderElement.append(eleProductOrder);
    });
  }

  buttonBuyEvent() {
    const buttonBuyElement = document.querySelector(
      ".button-buy",
    ) as HTMLButtonElement;
    const buttonConfirmedElement = document.querySelector(
      ".button-confimed-order",
    ) as HTMLButtonElement;

    const orderElement = document.querySelector(".black-box") as HTMLDivElement;
    buttonBuyElement.addEventListener("click", () => {
      orderElement.classList.remove("no-exist");
      this.dessertsCartConfirmed();
    });

    buttonConfirmedElement.addEventListener("click", () => {
      alert("Compra foi concluida");
      window.location.reload();
    });
  }

  addItem(button: HTMLDivElement): void {
    button.addEventListener("click", () => {
      const productDessertFather = button.closest(
        ".product-dessert",
      ) as HTMLDivElement;

      const productSearched = this.deserrts.find(
        (product) =>
          product.name ===
          button.closest(".button-add")?.getAttribute("data-name"),
      );

      if (!productSearched) return;

      const cardImg = productDessertFather.querySelector(
        ".card-img",
      ) as HTMLDivElement;
      cardImg.classList.add("product-dessert-border");

      this.cart.add(new Product(productSearched.name, productSearched.price));
      button.classList.add("no-exist");
      button.nextElementSibling?.classList.remove("no-exist");

      this.updateCart();
    });
  }

  increItem(button: HTMLDivElement): void {
    const eleSvgs = button.querySelectorAll(
      ".replace-img-svg",
    ) as NodeListOf<HTMLElement>;
    const elePrice = button.querySelector(
      ".quantity-of-product",
    ) as HTMLSpanElement;

    eleSvgs.forEach((buttonQtd, i) => {
      buttonQtd.addEventListener("click", () => {
        const buttonDiv = button.closest(".button-add") as HTMLButtonElement;
        const productSearched = this.deserrts.find(
          (product) => product.name === buttonDiv.getAttribute("data-name"),
        );
        if (productSearched) {
          const quantity =
            i === 0
              ? this.cart.ModifyQuatityProduct(productSearched.name, "-")
              : this.cart.ModifyQuatityProduct(productSearched.name, "+");
          elePrice.textContent = `${quantity}`;
        }

        this.updateCart();
      });
    });
  }

  dessertAdd() {
    const allElementButton = document.querySelectorAll(
      ".button-add",
    ) as NodeListOf<HTMLButtonElement>;

    allElementButton.forEach((buttons) => {
      // button.closest() ver isso depois
      const buttonAdd = buttons.children[0] as HTMLDivElement;

      if (buttonAdd.classList.contains("button-dessert"))
        this.addItem(buttonAdd);

      const buttonIncr = buttons.children[1] as HTMLDivElement;
      if (buttonIncr.classList.contains("button-incremented")) {
        this.increItem(buttonIncr);
      }
    });
  }

  updateCart() {
    const totalBuy = document.querySelectorAll(
      ".price-total",
    ) as NodeListOf<HTMLSpanElement>;

    this.checkCartEmpty();
    // clear
    productsAccount.innerHTML = "";

    this.cart.products.forEach(({ name, price, total, quantity }) => {
      const eleProductFinal = document.createElement("div");
      eleProductFinal.classList.add("card-product");
      eleProductFinal.setAttribute("data-name", name);
      eleProductFinal.innerHTML = productCard(name, price, total, quantity);
      productsAccount.append(eleProductFinal);
    });

    eleAmountCart.textContent = `${this.cart.quantityAll()}`;
    totalBuy.forEach(
      (element) =>
        (element.innerHTML = this.cart.total().toFixed(2).toString()),
    );
  }

  removeElementDessert(): void {
    productsAccount.addEventListener("click", (e) => {
      const button = e.target as HTMLElement;
      if (
        button.classList.contains("button-remove") ||
        button.closest(".button-remove")
      ) {
        const productCard = button.closest(".card-product") as HTMLDivElement;
        const name = productCard.getAttribute("data-name");

        const productSearched = this.deserrts.findIndex(
          (product) => product.name === name,
        );

        if (productSearched === -1) return;

        const indiceDelete = this.cart.products.findIndex(
          (i) => i.name === name,
        );

        const productsElement = eleProductsDesserts.querySelectorAll(
          ".product-dessert",
        ) as NodeListOf<HTMLDivElement>;

        productsElement.forEach((element) => {
          const cardImgElement = element.querySelector(
            ".product-name",
          ) as HTMLDivElement;
          const buttonElement = element.querySelector(
            ".button-incremented",
          ) as HTMLDivElement;

          if (cardImgElement.textContent === name) {
            const cardImg = element.querySelector(
              ".card-img",
            ) as HTMLDivElement;
            //terminar o butão
            cardImg.classList.remove("product-dessert-border");

            buttonElement.classList.add("no-exist");
            buttonElement.previousElementSibling?.classList.remove("no-exist");
          }
        });
        this.removeProducts(indiceDelete);
        this.updateCart();
      }
    });
  }

  checkCartEmpty() {
    const valueQtdCart = this.cart.quantityAll();

    if (valueQtdCart > 1) return;
    if (this.cart.quantityAll() !== 0) {
      eleImgEmpty.classList.add("no-exist");
    } else {
      eleImgEmpty.classList.remove("no-exist");
    }
  }

  removeProducts(indice: number) {
    this.cart.products.splice(indice, 1);
    eleAmountCart.textContent = `${this.cart.quantityAll()}`;
    // this.checkCartEmpty();
  }

  createElementDessert(date: DessertDbProtocol) {
    const { image, name, category, price } = date;
    const article = document.createElement("article");
    article.classList.add("product-dessert");
    article.innerHTML = productView(image, name, category, price.toString());

    eleProductsDesserts.appendChild(article);
  }
}
