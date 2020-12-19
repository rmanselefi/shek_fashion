export class Product {
  id: string;
  name: string;
  type: string;
  brand: string;
  code: string;
    color: string;
    size: string;
    stock: string;
    baseprice: number;

  constructor(
    id: string,
    name: string,
  type: string,
  brand: string,
  code: string,
    color: string,
      size: string,
     stock: string,
    baseprice: number
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.code = code;
    this.brand = brand;
      this.color = color;
      this.size = size;
      this.stock = stock;
      this.baseprice = baseprice;
  }
}
