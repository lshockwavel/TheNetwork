<script setup>
import { AppState } from '@/AppState.js';
import { postsService } from '@/services/PostsService.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';


const currentPage = computed(() => AppState.currentPage);
const totalPages = computed(() => AppState.totalPages);
const currentSearch = computed(() => AppState.currentSearch);


async function changePage(pageNumber) {
    try {
        // FIXME check to see if they are on the profile page, and call changeProfilePostPage in your service
        if (currentSearch.value) {
            await postsService.changeSearchPage(pageNumber, currentSearch.value);
        } else {
            await postsService.changePostPage(pageNumber);
        }
    } catch (error) {
        Pop.toast(`could not change page: ${error.message}`, 'error');
        console.error("Error changing page:", error);
    }
    AppState.currentPage = pageNumber;
    window.scrollTo(0, 0); // This scrolls to the top
}

</script>


<template>
    <div class="mt-2">
        <div class="text-center d-flex justify-content-evenly align-items-end">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1" class="btn btn-primary btn-lg me-2"> <i class="mdi mdi-arrow-left"></i> Previous</button>
            <p class="text-sm text-gray-500">
                Page {{ currentPage }} of {{ totalPages }}
            </p>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages" class="btn btn-primary btn-lg ms-2">Next <i class="mdi mdi-arrow-right"></i></button>
        </div>
    </div>
</template>


<style lang="scss" scoped>

</style>