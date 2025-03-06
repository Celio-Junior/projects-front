import { Cart } from "./classes/Cart";
import { Desserts } from "./classes/Desserts";

const cart = new Cart();
const desserts = new Desserts(cart);
desserts.init();
