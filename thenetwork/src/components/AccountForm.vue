<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref, watch } from 'vue';


const account = computed(() => AppState.account)


const accountData = ref({
    name: '',
    coverImg: '',
    picture: '',
    class: '',
    bio: '',
    linkedin: '',
    resume: '',
    github: '',
    graduated: false
})

watch(account, (newAccount) => {
    if (newAccount) {
        accountData.value = {
            name: newAccount.name || '',
            class: newAccount.class || '',
            coverImg: newAccount.coverImg || '',
            picture: newAccount.picture || '',
            bio: newAccount.bio || '',
            linkedin: newAccount.linkedin || '',
            resume: newAccount.resume || '',
            github: newAccount.github || '',
            graduated: newAccount.graduated || false
        };
    }
}, { immediate: true });

async function saveAccount() {
    try {
        await accountService.saveAccount(accountData.value);
        Pop.toast("Account saved successfully!");
    } catch (error) {
        console.error("Error saving account:", error);
        console.error(error);
    }
}
</script>


<template>
    <form @submit.prevent="saveAccount()">
        <section class="row mt-2">
            <img :src="accountData.coverImg" alt="Cover Image" class="magic-container" />
            <div class="d-flex align-items-end">
                <img :src="accountData.picture" alt="Profile Picture" class="profile-img" />
                <h1>{{ accountData.name }}</h1>
            </div>
        </section>
        <section class="row">
            <div class="col-md-6">
                <div>
                    <label for="account-name">Name:</label>
                    <input type="text" id="account-name" v-model="accountData.name" class="form-control" />
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <label for="account-coverImg">Cover Image URL:</label>
                    <input type="text" id="account-coverImg" v-model="accountData.coverImg" class="form-control" />
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <label for="account-profile">Profile Picture URL:</label>
                    <input type="text" id="account-profile" v-model="accountData.picture" class="form-control" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="d-flex align-items-center justify-content-around">
                    <div>
                        <label for="account-class">Class:</label>
                        <input type="text" id="account-class" v-model="accountData.class" class="form-control" />
                    </div>
                    <div>
                        <label for="account-graduated">Graduated? </label>
                        <input type="checkbox" id="account-graduated" v-model="accountData.graduated"
                            class="form-check-input" />
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <label for="account-github">GitHub URL:</label>
                    <input type="text" id="account-github" v-model="accountData.github" class="form-control" />
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <label for="account-resume">Resume URL:</label>
                    <input type="text" id="account-resume" v-model="accountData.resume" class="form-control" />
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <label for="account-linkedin">LinkedIn URL:</label>
                    <input type="text" id="account-linkedin" v-model="accountData.linkedin" class="form-control" />
                </div>
            </div>
            <div>
                <label for="account-bio">Bio:</label>
                <textarea id="account-bio" v-model="accountData.bio" class="form-control"></textarea>
            </div>
        </section>
        <button type="submit" class="btn btn-primary mt-2">Save Account</button>
    </form>
</template>


<style lang="scss" scoped>

.profile-cover {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
    margin-bottom: -3.5em;
    border-radius: 12px;
}

.profile-img {
    margin-top: -50px;
    /* Adjust this value as needed */
    height: 100px;
    width: 100px;
    object-fit: cover;
    object-position: center;
    border-radius: 50px;
}

.form-check-input {
  width: 1.5em;
  height: 1.5em;
}

  .magic-container {
    // position: relative;
    height: 40vh;
    border-radius: 35px;
    object-fit: cover;
  }

  .magic-card {
    position: absolute;
    line-height: 2.25em;
    bottom: 34em;
  }

    .magic-offset {
    margin-bottom: 8em;
  }

</style>