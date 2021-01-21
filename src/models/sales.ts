export class Sales {
  id: string;
  quantity: number;
  price: number;
  productid: string;
  branch: string;
  productname: string;
  inputValue?: string;
  sellerid?: string;
  soldby?: string;
  cashierid?: string;
  cashier?: string;

  constructor(
    id: string,
    quantity: number,
    price: number,
    productid: string,
    branch: string,
    productname: string,
    inputValue?: string,
    soldby?: string,
    sellerid?: string,
    cashierid?: string,
    cashier?: string
  ) {
    this.productid = productid;
    this.id = id;
    this.price = price;
    this.quantity = quantity;
    this.branch = branch;
    this.productname = productname;
    this.inputValue = inputValue;
    this.soldby = soldby;
    this.sellerid = sellerid;
    this.cashier = cashier;
    this.cashierid = cashierid;
  }
}
