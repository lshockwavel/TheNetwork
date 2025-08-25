<script setup>
import { AppState } from '@/AppState.js';
import AdsCard from '@/components/AdsCard.vue';
import PostsCard from '@/components/PostsCard.vue';
import SideNav from '@/components/SideNav.vue';
import { profilesService } from '@/services/ProfilesService.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const profile = computed(() => AppState.activeProfile);
// const account = computed(() => AppState.account);
const posts = computed(() => AppState.posts);

onMounted(() => {
  getProfile();
  getPostByProfileId();
});

async function getProfile() {
  try {
    await profilesService.getProfileById(route.params.profileId);
  } catch (error) {
    console.error("Failed to fetch profile:", error);
  }
}

async function getPostByProfileId() {
  try {
    await profilesService.getPostByProfileId(route.params.profileId);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
  }
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
                <div class="card mb-4 p-1 shadow">
                    <div class="cover-container position-relative" style="height: 200px;">
                        <img :src="profile?.coverImg" class="w-100 h-100 object-fit-cover rounded"
                            style="object-fit: cover;">
                        <img :src="profile?.picture"
                            class="rounded-circle profile-pic position-absolute icon-left translate-middle-x"
                            style="bottom: -25px; width: 80px; height: 80px; border: 4px solid #fff;">
                        <span v-if="profile?.graduated"
                            class="position-absolute graduation-icon-left translate-middle-x bg-secondary border border-dark rounded-circle d-flex align-items-center justify-content-center"
                            style="bottom: -25px; width: 32px; height: 32px;">
                            <i class="mdi mdi-school text-white"></i>
                        </span>
                        <div class="d-flex align-items-center position-absolute social-icons-row"
                            style="bottom: -25px; left: 60%;">
                            <a v-if="profile?.linkedin" :href="profile.linkedin" target="_blank" class="me-2">
                                <i class="mdi mdi-linkedin text-primary fs-3"></i>
                            </a>
                            <a v-if="profile?.resume" :href="profile.resume" target="_blank" class="me-2">
                                <i class="mdi mdi-file-document fs-3"></i>
                            </a>
                            <a v-if="profile?.github" :href="profile.github" target="_blank">
                                <i class="mdi mdi-github fs-3"></i>
                            </a>
                        </div>
                    </div>
                    <h3 class="mt-4">{{ profile?.name }}</h3>
                    <p>{{ profile?.bio }}</p>
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


<style lang="scss" scoped>

.icon-left {
    left: 10%;
}

.graduation-icon-left {
    left: 15%;
}

.icon-right {
    right: -25px;
}

</style>