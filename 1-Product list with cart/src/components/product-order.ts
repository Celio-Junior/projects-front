export default function ProductOrder(
  name: string,
  price: number,
  total: number,
  quantity: number,
  image: string,
): string {
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
