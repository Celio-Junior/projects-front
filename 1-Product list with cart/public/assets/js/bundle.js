/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/Cart.ts":
/*!*****************************!*\
  !*** ./src/classes/Cart.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cart = void 0;
class Cart {
    constructor() {
        this.products = [];
    }
    quantityAll() {
        return this.products.reduce((total, { quantity }) => total + quantity, 0);
    }
    add(productDessert) {
        this.products.push(productDessert);
    }
    ModifyQuatityProduct(product, mode) {
        return this.products.reduce((isExistProduct, productOrigin) => {
            if (productOrigin.name === product) {
                const qtd = mode === "+"
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
    total() {
        return this.products.reduce((total, product) => {
            total += product.total;
            return total;
        }, 0);
    }
}
exports.Cart = Cart;


/***/ }),

/***/ "./src/classes/Desserts.ts":
/*!*********************************!*\
  !*** ./src/classes/Desserts.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Desserts = void 0;
const product_view_1 = __importDefault(__webpack_require__(/*! ../components/product-view */ "./src/components/product-view.ts"));
const product_card_1 = __importDefault(__webpack_require__(/*! ../components/product-card */ "./src/components/product-card.ts"));
const Product_1 = __webpack_require__(/*! ./Product */ "./src/classes/Product.ts");
const product_order_1 = __importDefault(__webpack_require__(/*! ../components/product-order */ "./src/components/product-order.ts"));
const eleAmountCart = document.querySelector("#products-amount");
const eleProductsDesserts = document.querySelector(".products");
const productsAccount = document.querySelector("#products-account");
const productsOrderElement = document.querySelector("#products-order");
const eleImgEmpty = document.querySelector("#img-empty-itens");
class Desserts {
    constructor(cart) {
        this.cart = cart;
        this.deserrts = [];
        this.pathDb = "./assets/database/data.json";
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadingDesserts();
            this.dessertAdd();
            this.removeElementDessert();
            this.buttonBuyEvent();
        });
    }
    loadingDesserts() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.pathDb);
            this.deserrts = yield response.json();
            this.deserrts.forEach((dessertDate) => {
                this.createElementDessert(dessertDate);
            });
        });
    }
    dessertsCartConfirmed() {
        this.cart.products.forEach(({ name, price, total, quantity }) => {
            const eleProductOrder = document.createElement("div");
            eleProductOrder.classList.add("card-order");
            const productSearched = this.deserrts.find((product) => product.name === name);
            eleProductOrder.innerHTML = (0, product_order_1.default)(name, price, total, quantity, productSearched.image.thumbnail);
            productsOrderElement.append(eleProductOrder);
        });
    }
    buttonBuyEvent() {
        const buttonBuyElement = document.querySelector(".button-buy");
        const buttonConfirmedElement = document.querySelector(".button-confimed-order");
        const orderElement = document.querySelector(".black-box");
        buttonBuyElement.addEventListener("click", () => {
            orderElement.classList.remove("no-exist");
            this.dessertsCartConfirmed();
        });
        buttonConfirmedElement.addEventListener("click", () => {
            alert("Compra foi concluida");
            window.location.reload();
        });
    }
    addItem(button) {
        button.addEventListener("click", () => {
            var _a;
            const productDessertFather = button.closest(".product-dessert");
            const productSearched = this.deserrts.find((product) => {
                var _a;
                return product.name ===
                    ((_a = button.closest(".button-add")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-name"));
            });
            if (!productSearched)
                return;
            const cardImg = productDessertFather.querySelector(".card-img");
            cardImg.classList.add("product-dessert-border");
            this.cart.add(new Product_1.Product(productSearched.name, productSearched.price));
            button.classList.add("no-exist");
            (_a = button.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove("no-exist");
            this.updateCart();
        });
    }
    increItem(button) {
        const eleSvgs = button.querySelectorAll(".replace-img-svg");
        const elePrice = button.querySelector(".quantity-of-product");
        eleSvgs.forEach((buttonQtd, i) => {
            buttonQtd.addEventListener("click", () => {
                const buttonDiv = button.closest(".button-add");
                const productSearched = this.deserrts.find((product) => product.name === buttonDiv.getAttribute("data-name"));
                if (productSearched) {
                    const quantity = i === 0
                        ? this.cart.ModifyQuatityProduct(productSearched.name, "-")
                        : this.cart.ModifyQuatityProduct(productSearched.name, "+");
                    elePrice.textContent = `${quantity}`;
                }
                this.updateCart();
            });
        });
    }
    dessertAdd() {
        const allElementButton = document.querySelectorAll(".button-add");
        allElementButton.forEach((buttons) => {
            const buttonAdd = buttons.children[0];
            if (buttonAdd.classList.contains("button-dessert"))
                this.addItem(buttonAdd);
            const buttonIncr = buttons.children[1];
            if (buttonIncr.classList.contains("button-incremented")) {
                this.increItem(buttonIncr);
            }
        });
    }
    updateCart() {
        const totalBuy = document.querySelectorAll(".price-total");
        this.checkCartEmpty();
        productsAccount.innerHTML = "";
        this.cart.products.forEach(({ name, price, total, quantity }) => {
            const eleProductFinal = document.createElement("div");
            eleProductFinal.classList.add("card-product");
            eleProductFinal.setAttribute("data-name", name);
            eleProductFinal.innerHTML = (0, product_card_1.default)(name, price, total, quantity);
            productsAccount.append(eleProductFinal);
        });
        eleAmountCart.textContent = `${this.cart.quantityAll()}`;
        totalBuy.forEach((element) => (element.innerHTML = this.cart.total().toFixed(2).toString()));
    }
    removeElementDessert() {
        productsAccount.addEventListener("click", (e) => {
            const button = e.target;
            if (button.classList.contains("button-remove") ||
                button.closest(".button-remove")) {
                const productCard = button.closest(".card-product");
                const name = productCard.getAttribute("data-name");
                const productSearched = this.deserrts.findIndex((product) => product.name === name);
                if (productSearched === -1)
                    return;
                const indiceDelete = this.cart.products.findIndex((i) => i.name === name);
                const productsElement = eleProductsDesserts.querySelectorAll(".product-dessert");
                productsElement.forEach((element) => {
                    var _a;
                    const cardImgElement = element.querySelector(".product-name");
                    const buttonElement = element.querySelector(".button-incremented");
                    if (cardImgElement.textContent === name) {
                        const cardImg = element.querySelector(".card-img");
                        cardImg.classList.remove("product-dessert-border");
                        buttonElement.classList.add("no-exist");
                        (_a = buttonElement.previousElementSibling) === null || _a === void 0 ? void 0 : _a.classList.remove("no-exist");
                    }
                });
                this.removeProducts(indiceDelete);
                this.updateCart();
            }
        });
    }
    checkCartEmpty() {
        const valueQtdCart = this.cart.quantityAll();
        if (valueQtdCart > 1)
            return;
        if (this.cart.quantityAll() !== 0) {
            eleImgEmpty.classList.add("no-exist");
        }
        else {
            eleImgEmpty.classList.remove("no-exist");
        }
    }
    removeProducts(indice) {
        this.cart.products.splice(indice, 1);
        eleAmountCart.textContent = `${this.cart.quantityAll()}`;
    }
    createElementDessert(date) {
        const { image, name, category, price } = date;
        const article = document.createElement("article");
        article.classList.add("product-dessert");
        article.innerHTML = (0, product_view_1.default)(image, name, category, price.toString());
        eleProductsDesserts.appendChild(article);
    }
}
exports.Desserts = Desserts;


/***/ }),

/***/ "./src/classes/Product.ts":
/*!********************************!*\
  !*** ./src/classes/Product.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Product = void 0;
class Product {
    constructor(name, priceUni) {
        this.quantity = 1;
        this.name = name;
        this.price = priceUni;
    }
    get total() {
        return this.price * this.quantity;
    }
}
exports.Product = Product;


/***/ }),

/***/ "./src/components/product-card.ts":
/*!****************************************!*\
  !*** ./src/components/product-card.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = ProductCard;
function ProductCard(name, price, total, quantity) {
    return `<strong class="product-name">${name}</strong>
          <div class="description-item">
            <span aria-label="quantity">${quantity}</span>
            <span aria-label="price-uni-product">${price}</span>
            <span aria-label="price-total-product">${total}</span>
          </div>
          <svg class="button-remove" viewBox="0 0 30 30">
            <circle cx="15" cy="15" r="10"/>
            <line x1="10" y1="20" x2="20" y2="10" />
            <line x1="10" y1="10" x2="20" y2="20" />
          </svg>`;
}


/***/ }),

/***/ "./src/components/product-order.ts":
/*!*****************************************!*\
  !*** ./src/components/product-order.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = ProductOrder;
function ProductOrder(name, price, total, quantity, image) {
    return ` <div class="img-tumbnail">
            <img src="${image}" alt="teste ${name}">
          </div>

          <div class="description-item">
            <strong class="product-name">${name}</strong>
            <div class="description-price-item">
              <span aria-label="quantity">${quantity}</span>
              <span aria-label="price-uni-product">${price}</span>
              <span aria-label="price-total-product">${total}</span>
            </div>
          </div>`;
}


/***/ }),

/***/ "./src/components/product-view.ts":
/*!****************************************!*\
  !*** ./src/components/product-view.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const productCard = (imgDesktop, name, category, price) => {
    return `<header class="product-header">
            <div class="card-img">
            <picture>
            <source srcset="${imgDesktop.mobile}" media="(max-width: 400px)">
            <source srcset="${imgDesktop.tablet}" media="(max-width: 750px)">
            <img src="${imgDesktop.desktop}" alt="image ${name}">
              </picture>
            </div>
            <button class="button-add" data-name="${name}">
              <div class="button-dessert">
                <img src="./assets/images/icon-add-to-cart.svg" alt="icon cart">
                Add to Cart
              </div>

              <div class="button-incremented no-exist">
                <div class="replace-img-svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
                </div>

                <span class="quantity-of-product">1</span>

                <div class="replace-img-svg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                </div>
              </div>
            </button>
          </header>

          <div class="description">
            <span class="category">${category}</span>
            <h3 class="product-name">${name}</h3>
            <span class="price">${zeroRight(price)}</span>
          </div>`;
};
exports["default"] = productCard;
function zeroRight(number) {
    return number.length > 1 ? number.padEnd(4, "0") : number + ".00";
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const Cart_1 = __webpack_require__(/*! ./classes/Cart */ "./src/classes/Cart.ts");
const Desserts_1 = __webpack_require__(/*! ./classes/Desserts */ "./src/classes/Desserts.ts");
const cart = new Cart_1.Cart();
const desserts = new Desserts_1.Desserts(cart);
desserts.init();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map