import { ImageInterface } from "../interface/ImageInterface";

type ProductCardaInterface = (
  imgs: ImageInterface,
  name: string,
  category: string,
  price: string,
) => string;
const productCard: ProductCardaInterface = (
  imgDesktop,
  name,
  category,
  price,
) => {
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

export default productCard;

function zeroRight(number: string) {
  return number.length > 1 ? number.padEnd(4, "0") : number + ".00";
}
