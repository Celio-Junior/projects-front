import { ImageInterface } from "./ImageInterface";

export interface DessertDbProtocol {
  image: ImageInterface;
  name: string;
  category: string;
  price: number;
}
