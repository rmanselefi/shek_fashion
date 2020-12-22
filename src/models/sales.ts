export class Sales {
    id: string;
    quantity: number;
    price: number;
    productid: string;
    constructor(
        id: string,
        quantity: number,
        price: number, productid: string) {
        this.productid = productid;
        this.id = id;
        this.price = price;
        this.quantity = quantity;

    }
}