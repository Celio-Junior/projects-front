export default function ProductCard(
  name: string,
  price: number,
  total: number,
  quantity: number,
): string {
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
