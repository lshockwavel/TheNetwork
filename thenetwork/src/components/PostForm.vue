<script setup>
import { AppState } from '@/AppState.js';
import { postsService } from '@/services/PostsService.js';
import { ref, watch } from 'vue';


const creating = ref(false);

//WIP on updates for watch
watch(() => AppState.activePost, (newPost) => {
    if (newPost) {
        postData.value = {
            body: newPost.body,
            imgUrl: newPost.imgUrl
        };
    }
});

const postData = ref({
  body: '',
  imgUrl: ''
});

function resetForm() {
    postData.value = {
        body: '',
        imgUrl: ''
    };
    AppState.activePost = null;
}

async function submitPost() {
    try {

        console.log("Submitting post:", postData.value);

        if (AppState.activePost) {
            console.log("Updating existing post with ID:", AppState.activePost.id);
            // Update existing post
            await postsService.updatePost(AppState.activePost.id, postData.value);
        } else {
            console.log("Creating new post");
            // Create new post
            await postsService.createPost(postData.value);
        }
        resetForm();
    } catch (error) {
        console.error("Failed to submit post:", error);
    }
}


</script>


<template>
    <form @submit.prevent="submitPost()" class="p-2 rounded border">
        <div>
            <label for="body">Body:</label>
            <textarea id="body" v-model="postData.body" required class="form-control"></textarea>
        </div>
        <div>
            <label for="imgUrl">Image URL:</label>
            <input type="url" id="imgUrl" v-model="postData.imgUrl" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary mt-1">Submit</button>
    </form>
</template>


<style lang="scss" scoped>

</style>