export class Whistle {
  id: string;
  licensenumber: string;
  vehicletype: string;
  date: string;
  erken: string;
  penaltycode: string;
  hour: string;

  constructor(
    id: string,
    licensenumber: string,
    vehicletype: string,
    date: string,
    erken: string,
    penaltycode: string,
    hour: string
  ) {
    this.id = id;
    this.vehicletype = vehicletype;
    this.date = date;
    this.erken = erken;
    this.penaltycode = penaltycode;
    this.licensenumber = licensenumber;
    this.hour = hour;
  }
}
