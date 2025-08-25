<script setup>
import { AppState } from '@/AppState.js';
import { adsService } from '@/services/AdsService.js';
import { computed, onMounted } from 'vue';

const ads = computed(() => AppState.ads);

onMounted(() => {
    console.log('AdsCard component mounted');
    AddNumberOfAds();
});


async function AddNumberOfAds(number = 0) {
    console.log('Adding number of ads');

    //If they didn't choose a number, default to this. Otherwise, use the provided number.
    if (number == 0) {
        await adsService.getAds();
    }
    else {
        await adsService.getAdsByNumber(number);
    }
}

</script>


<template>
    <div v-for="ad in ads" :key="ad.title">
        <img :src="ad.tall" :alt="ad.title" class="img-fluid mt-3 rounded">
    </div>
</template>


<style lang="scss" scoped>

</style>