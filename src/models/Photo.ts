import { Entity } from "./Entity";

export interface Photo extends Entity {
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
