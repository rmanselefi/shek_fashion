export default class Warning {
  id: string;
  text: string;
  licensenumber: string;
  date: string;
  constructor(id: string, text: string, licensenumber: string, date: string) {
    this.id = id;
    this.text = text;
    this.licensenumber = licensenumber;
    this.date = date;
  }
}
