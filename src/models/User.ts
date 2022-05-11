import { Address } from "./Address";
import { Company } from "./Company";
import { Entity } from "./Entity";

export interface User extends Entity {
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}
