export class Sales {
  id: string;
  quantity: number;
  price: number;
  productid: string;
  branch: string;
  productname:string;
  inputValue?: string;

  constructor(
    id: string,
    quantity: number,
    price: number,
    productid: string,
    branch: string,
    productname:string,
    inputValue?: string

  ) {
    this.productid = productid;
    this.id = id;
    this.price = price;
    this.quantity = quantity;
    this.branch = branch;
    this.productname=productname;
    this.inputValue=inputValue;
  }
}
