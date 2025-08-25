<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';
import AccountForm from '@/components/AccountForm.vue';

const account = computed(() => AppState.account)

</script>

<template>
  <div class="about text-center container">
    <div v-if="account">
      <!-- <h1>Welcome {{ account.name }}</h1>
      <h3>Edit your Account here</h3>
      <img class="rounded" :src="account.picture" alt="" />
      <img :src="account.coverImage" alt="">
      <p>{{ account.email }}</p> -->
      <AccountForm />
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
