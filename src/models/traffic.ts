export default class Traffic {
  id: string;
  email: string;
  password: string;
  name: string;
  level: string;
  role: string;
  idnum: string;
  constructor(
    id: string,
    email: string,
    password: string,
    name: string,
    level: string,
    role: string,
    idnum: string
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.level = level;
    this.role = role;
    this.idnum = idnum;
  }
}
