import { Album } from "@/models/Album";
import { Photo } from "@/models/Photo";
import { User } from "@/models/User";
import axios from "axios";

enum Paths {
  USERS = "users",
  ALBUMS = "albums",
  PHOTOS = "photos",
}

export class API {
  private api = axios.create({ baseURL: "https://jsonplaceholder.typicode.com/" });

  public fetchUsers = async (): Promise<User[]> => {
    return this.api.get(Paths.USERS).then((res) => {
      return res.data as User[];
    });
  };

  public fetchAlbumsByUserId = async (id: number): Promise<Album[]> => {
    return this.api.get(Paths.ALBUMS, { params: { userId: id } }).then((res) => {
      return res.data as Album[];
    });
  };

  public fetchPhotosByAlbumId = async (id: number): Promise<Photo[]> => {
    return this.api.get(Paths.PHOTOS, { params: { albumId: id } }).then((res) => {
      return res.data as Photo[];
    });
  };
}