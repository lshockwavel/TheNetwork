<script setup >
import { AppState } from '@/AppState.js';
import AdsCard from '@/components/AdsCard.vue';
import Example from '@/components/Example.vue';
import PostForm from '@/components/PostForm.vue';
import PostsCard from '@/components/PostsCard.vue';
import SideNav from '@/components/SideNav.vue';
import { postsService } from '@/services/PostsService.js';
import { computed, onMounted, ref } from 'vue';

const creating = ref(false);
const posts = computed(() => AppState.posts)
const account = computed(() => AppState.account)

onMounted(() => {
  getPosts();
})

async function getPosts() {
  try {
    await postsService.getPosts();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
}

async function createNewPost() {
  creating.value = true;
  AppState.activePost = null;
}

</script>

<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-md-2">
        <!-- Side Profile Nav -->
        <SideNav />
      </div>
      <div class="col-md-8">
        <div v-if="account">
          <button v-if="!creating" @click="createNewPost" class="btn btn-success btn-lg w-100 my-1">Create Post</button>
          <button v-if="creating" @click="creating = false" class="btn btn-outline-danger btn-sm my-1">Cancel</button>
          <PostForm v-if="creating" />
        </div>
        <PostsCard v-for="post in posts" :key="post.id" :post="post" />
        <!-- <Example /> -->
      </div>
      <div class="col-md-2 d-none d-md-block">
        <!-- Side Ads -->
        <AdsCard />
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>
