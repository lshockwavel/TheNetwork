import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";
import { Profile } from "@/models/Profile.js";
import { Post } from "@/models/Post.js";


class ProfilesService {

    async getProfileById(profileId) {
        AppState.activeProfile = null;
        const res = await api.get(`api/profiles/${profileId}`);
        console.log('getProfileById:', res.data);
        AppState.activeProfile = new Profile(res.data);
    }

    async getProfilesSearch(searchTerm) {
        const res = await api.get(`api/profiles/?query=${searchTerm}`);
        console.log("getProfilesSearch:", res.data);
        AppState.profiles = res.data.map(p => new Profile(p));
    }

    async getPostByProfileId(profileId) {
        AppState.activePost = null;
        const res = await api.get(`api/profiles/${profileId}/posts`);
        console.log("getPostByProfileId:", res.data);
        AppState.posts = res.data.posts.map(p => new Post(p));
        AppState.currentPage = res.data.page;
        AppState.totalPages = res.data.totalPages;
    }
}

export const profilesService = new ProfilesService();
