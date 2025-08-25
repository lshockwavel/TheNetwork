<script setup>
import { AppState } from '@/AppState.js';
import { postsService } from '@/services/PostsService.js';
import { computed, ref } from 'vue';

const account = computed(() => AppState.account)

const searchTerm = ref('');
const currentSearch = computed(() => AppState.currentSearch);

async function searchPosts() {
    try {
        console.log('Searching posts for:', searchTerm.value);
        await postsService.searchPosts(searchTerm.value);
        AppState.currentSearch = searchTerm.value;
        searchTerm.value = '';
    } catch (error) {
        console.error('Error searching posts:', error);
    }
}

async function clearSearch() {
    try {
        AppState.currentSearch = '';
        await postsService.getPosts();
    } catch (error) {
        console.error('Error clearing search:', error);
    }
}

</script>


<template>
    <label for="search">Search:</label>
    <form class="input-group" @submit.prevent="searchPosts">
        <input type="text" id="search" v-model="searchTerm" class="form-control" />
        <button type="submit" class="btn btn-primary">Search</button>
    </form>
    <button v-if="currentSearch" @click="clearSearch" class="btn btn-info">X {{ currentSearch }}</button>
    <!-- <span v-if="currentSearch" @click="clearSearch" class="badge bg-info">{{ currentSearch }}</span> -->
    <section v-if="account" class="sidenav d-md-block d-none mt-2">
        <div class="profile-section text-center p-3">
            <div class="position-relative d-inline-block" style="width: 100px; height: 100px;">
                <img :src="account?.picture" alt="Profile Picture" class="rounded-circle mb-2" width="100" height="100">
                <span v-if="account?.graduated"
                    class="position-absolute translate-middle p-1 bg-secondary border border-dark rounded-circle d-flex align-items-center justify-content-center graduated">
                    <i class="mdi mdi-account-school text-white"></i>
                </span>
            </div>
            <h5>{{ account?.name }}</h5>
            <a v-if="account?.linkedin" :href="'https://' + account.linkedin" target="_blank" class="me-2">
                <i class="mdi mdi-linkedin text-primary fs-3"></i>
            </a>
            <a v-if="account?.resume" :href="'https://' + account.resume" target="_blank" class="me-2">
                <i class="mdi mdi-file-document fs-3"></i>
            </a>
            <a v-if="account?.github" :href="'https://' + account.github" target="_blank">
                <i class="mdi mdi-github fs-3"></i>
            </a>
        </div>
    </section>
    <section v-else class="sidenav d-md-block d-none">
        <div class="profile-section text-center p-3">
            <h5>Welcome, Guest!</h5>
            <p class="text-muted">Please log in to access more features.</p>
        </div>
    </section>

</template>


<style lang="scss" scoped>

.sidenav {
    background-color: #f8f9fa;
    
    // border-right: 1px solid #dee2e6;
    // height: 100vh;
    // padding: 1rem;
}

.profile-section {
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 1rem;
}

span.graduated {
    width: 32px;
    height: 32px;
    bottom: -20px;
    right: -20px;
}

</style>