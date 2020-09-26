import { stat } from "fs";

export class Driver {
  id: string;
  name: string;
  licensenumber: string;
  gender: string;
  issuedat: string;
  expirydate: string;
  phonenumber: string;
  birthdate: string;
  region: string;
  subcity: string;
  kebele: string;
  housenumber: string;
  status: string;

  constructor(
    id: string,
    name: string,
    licensenumber: string,
    gender: string,
    issuedat: string,
    expirydate: string,
    phonenumber: string,
    birthdate: string,
    region: string,
    subcity: string,
    kebele: string,
    housenumber: string,
    status: string
  ) {
    this.id = id;
    this.name = name;
    this.licensenumber = licensenumber;
    this.gender = gender;
    this.issuedat = issuedat;
    this.expirydate = expirydate;
    this.housenumber = housenumber;
    this.region = region;
    this.birthdate = birthdate;
    this.kebele = kebele;
    this.subcity = subcity;
    this.phonenumber = phonenumber;
    this.status = status;
  }
}
