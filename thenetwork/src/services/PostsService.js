import { AppState } from "@/AppState.js";
import { api } from "./AxiosService.js";
import { Post } from "@/models/Post.js";



class PostsService {
    async getPosts() {
        const res = await api.get('api/posts');
        console.log("getPosts:", res.data);
        this.handleResponse(res.data);
        console.log("AppState.posts:", AppState.posts);
    }

    async createPost(postData) {
        const res = await api.post('api/posts', postData);
        console.log("createPost:", res.data);
        const postResponse = new Post(res.data);
        AppState.posts.unshift(postResponse);
    }

    async updatePost(postId, postData) {
        const res = await api.put(`api/posts/${postId}`, postData);
        console.log("updatePost:", res.data);
    }

    /**
     * @param {any} postId
     */
    async deletePost(postId) {
        await api.delete(`api/posts/${postId}`);
        console.log("deletePost:", postId);
        AppState.posts = AppState.posts.filter(post => post.id !== postId);
    }

    async getPostById(postId) {
        const res = await api.get(`api/posts/${postId}`);
        console.log("getPostById:", res.data);
    }

    async likeOrUnlikePost(postId) {
        const res = await api.post(`api/posts/${postId}/like`);
        console.log("likeOrUnlikePost:", res.data);
        const updatedPost = new Post(res.data);

        const index = AppState.posts.findIndex(p => p.id === postId);
        AppState.posts.splice(index, 1, updatedPost);
    }

    async changePostPage(pageNumber) {
        const res = await api.get(`api/posts?page=${pageNumber}`);
        console.log("changePostPage:", res.data);
        this.handleResponse(res.data);
    }

    /**
     * @param {string} searchTerm
     */
    async searchPosts(searchTerm) {
        const res = await api.get(`api/posts/?query=${searchTerm}`);
        console.log("searchPosts:", res.data);
        const posts = res.data.posts.map(p => new Post(p));
        AppState.posts = posts;
        // AppState.currentSearch = searchTerm;
        AppState.currentPage = res.data.page;
        AppState.totalPages = res.data.totalPages;
    }

    /**
     * @param {any} pageNumber
     * @param {any} searchTerm
     */
    async changeSearchPage(pageNumber, searchTerm) {
        const res = await api.get(`api/posts/?query=${searchTerm}&page=${pageNumber}`);
        console.log("changeSearchPage:", res.data);
        this.handleResponse(res.data);
    }

    //Will need to handle Response for search and pagination??
    /**
     * @param {{ posts: any[]; page: number; totalPages: number; }} responseData
     */
    handleResponse(responseData) {
        const posts = responseData.posts.map(p => new Post(p));
        AppState.posts = posts;
        AppState.currentPage = responseData.page;
        AppState.totalPages = responseData.totalPages;
    }
}

export const postsService = new PostsService();
