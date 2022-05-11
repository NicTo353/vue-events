import { Coordinates } from "./Coordinates";
import { Entity } from "./Entity";

export interface Profile extends Entity {
  id: number;
  name: string;
  email: string;
  photoUrl: string;
  leftTopCornerCords: Coordinates;
}
