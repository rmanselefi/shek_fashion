export class User {
  name:string;
  email: string;
  password: string;
  role: string;
  branch:string;

  constructor(name:string,email: string, password: string,role: string,branch:string) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.name=name;
    this.branch=branch;
  }
}
