export class Product {
  id: string;
  name: string;
  type: string;
  brand: string;
  code: string;
  color: string;
  size?:string;
  sizeQuantity?:number;
  baseprice: number;
  branch: string;
  category: string;
  image?: any;
  file?: any;
  initialstock?: string;

  constructor(
    id: string,
    name: string,
    type: string,
    brand: string,
    code: string,
    color: string,
    baseprice: number,
    branch: string,
    category: string,
    image?: string,
    file?: any,
    initialstock?: string,
    size?:string,
    sizeQuantity?:number,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.code = code;
    this.brand = brand;
    this.color = color;
    this.baseprice = baseprice;
    this.branch = branch;
    this.category = category;
    this.image = image;
    this.file = file;
    this.initialstock = initialstock;
    this.size=size;
    this.sizeQuantity=sizeQuantity;
  }
}
