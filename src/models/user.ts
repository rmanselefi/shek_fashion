export class User {
  name:string;
  email: string;
  password: string;
  role: string;

  constructor(name:string,email: string, password: string,role: string) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.name=name;
  }
}
