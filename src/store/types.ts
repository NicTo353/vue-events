import { Album } from "./../models/Album";
import { Photo } from "./../models/Photo";
import { User } from "@/models/User";
import { Profile } from "./../models/Profile";

export interface State {
  users: User[];
  albums: Album[];
  photos: Photo[];
  profiles: Profile[];
}

export enum GetterNames {
  getProfiles = "getProfiles",
}

export enum MutationTypes {
  setUsers = "setUsers",
  addAlbums = "addAlbums",
  addPhotos = "addPhotos",
  addProfile = "addProfile",
  clearProfiles = "clearProfiles",
}

export enum ActionTypes {
  updateUsersAsync = "updateUsersAsync",
  addUserAlbumsAsync = "addUserAlbumsAsync",
  addAlbumPhotosAsync = "addAlbumPhotosAsync",
  addProfileAsync = "addProfileAsync",
}
