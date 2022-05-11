import { API } from "./../api/index";
import { ActionTypes, MutationTypes, State } from "./types";
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { User } from "@/models/User";
import { Album } from "@/models/Album";
import { Photo } from "@/models/Photo";
import { getRandomValue } from "@/utils/getRandomValue";
import { Coordinates } from "@/models/Coordinates";
import { Profile } from "@/models/Profile";

const api = new API();

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    users: [],
    albums: [],
    photos: [],
    profiles: [],
  },

  getters: {},

  mutations: {
    [MutationTypes.setUsers](state, users: User[]) {
      state.users = users;
    },

    [MutationTypes.addAlbums](state, albums: Album[]) {
      state.albums = [...state.albums, ...albums];
    },

    [MutationTypes.addPhotos](state, photos: Photo[]) {
      state.photos = [...state.photos, ...photos];
    },

    [MutationTypes.addProfile](state, profile: Profile) {
      state.profiles = [...state.profiles, profile];
    },

    [MutationTypes.clearProfiles](state) {
      state.profiles = [];
    },
  },

  actions: {
    async [ActionTypes.updateUsersAsync]({ commit }) {
      return api.fetchUsers().then((users) => {
        commit(MutationTypes.setUsers, users);
      });
    },

    async [ActionTypes.addUserAlbumsAsync]({ commit }, { id }: { id: number }) {
      return api.fetchAlbumsByUserId(id).then((albums) => {
        commit(MutationTypes.addAlbums, albums);
      });
    },

    async [ActionTypes.addAlbumPhotosAsync]({ commit }, { id }: { id: number }) {
      return api.fetchPhotosByAlbumId(id).then((photos) => {
        commit(MutationTypes.addPhotos, photos);
      });
    },

    async [ActionTypes.addProfileAsync]({ commit, dispatch, state }, coordiantes: Coordinates) {
      if (!state.users.length) {
        return;
      }
      const user = state.users[getRandomValue(0, state.users.length - 1)];
      const userAlbumsFetched = !!state.albums.find((album) => user.id === album.userId);

      if (!userAlbumsFetched) {
        await dispatch(ActionTypes.addUserAlbumsAsync, user.id);
      }
      const userAlbums = state.albums.filter((album) => album.userId === user.id);

      const album = userAlbums[getRandomValue(0, userAlbums.length - 1)];
      const albumPhotosFetched = !!state.photos.find((photo) => photo.albumId === album.id);

      if (!albumPhotosFetched) {
        await dispatch(ActionTypes.addAlbumPhotosAsync, album.id);
      }
      const albumPhotos = state.photos.filter((photo) => photo.albumId === album.id);
      const photo = albumPhotos[getRandomValue(0, albumPhotos.length - 1)];

      if (album && photo) {
        const profile: Profile = {
          id: user.id,
          name: user.name,
          email: user.email,
          photoUrl: photo.url,
          leftTopCornerCords: coordiantes,
        };
        commit(MutationTypes.addProfile, profile);
      }
    },
  },
});

export function useStore(): Store<State> {
  return baseUseStore(key);
}
