export class Size {
  id?: number;
  size: string;
  sizeQuantiy: number;

  constructor(size: string, sizeQuantiy: number, id?: number) {
    this.id = id;
    this.size = size;
    this.sizeQuantiy = sizeQuantiy;
  }
}
