<script setup>
import { AppState } from '@/AppState.js';
import { Post } from '@/models/Post.js';
import { postsService } from '@/services/PostsService.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';



defineProps( { post: Post});

const user = computed(() => AppState.account);

const activePost = computed(() => AppState.activePost); //?? This might be needed

// function likedPost(postId) {
//     AppState.users.find(user => user.id === post.creatorId)
//     post.likes.push(AppState.account.id);
//     AppState.activePost = AppState.activePost.id === postId ? null : AppState.posts.find(post => post.id === postId);
// }

async function likePost(postId) {
    try {
        await postsService.likeOrUnlikePost(postId);
    } catch (error) {
        console.error("Failed to like post:", error);
    }
}

async function deletePost(postId) {
    try {
        const confirm = window.confirm("Are you sure you want to delete this post?");
        if (confirm) {
            await postsService.deletePost(postId);
            Pop.toast("Post deleted successfully!");
        }
    } catch (error) {
        console.error("Failed to delete post:", error);
    }
}

</script>


<template>
    <div class="card mt-2">
        <div class="d-flex">
            <div>
                <RouterLink :to="{name: 'Profile', params: { profileId: post.creator.id }}">
                    <img :src="post.creator.picture" alt="Profile Picture" class="rounded-circle m-3 clickable-profile" width="75"
                        height="75">
                </RouterLink>
            </div>
            <div class="card-width">
                <h1>{{ post.creator.name }}</h1>
                <span>{{ post.createdDate }} <i class="mdi mdi-account-school" v-if="post.creator.graduated" :title="'Congrats ' + post.creator.name + '!'"></i></span>
                <p>{{ post.body }}</p>
            </div>
            <div>
                <button v-if="user?.id === post.creator.id" @click="deletePost(post.id)" class="btn btn-danger">Delete</button>
            </div>
        </div>
        <img v-if="post.imgUrl" :src="post.imgUrl" alt="Post Image" class="rounded Post-Image">
        <span @click="likePost(post.id)" class="text-end g-2 fs-4 like-post">
            <i v-if="user && post.likeIds.includes(user.id)" class="mdi mdi-thumb-up" title="Unlike this post?"></i>
            <i v-else class="mdi mdi-thumb-up-outline" title="Like this post?"></i>
            {{ post.likes.length }}
        </span>
    </div>
</template>


<style lang="scss" scoped>

.card-width {
  flex: 1;
  padding: 1rem;
}

.Post-Image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  object-fit: contain;
  height: 40vh;
}

.clickable-profile {
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}

.like-post {
  cursor: pointer;
  transition: color 0.2s;
}

.like-post:hover {
  color: #007bff;
}

.clickable-profile:hover {
  box-shadow: 0 0 8px #007bff;
  transform: scale(1.08);
}

</style>