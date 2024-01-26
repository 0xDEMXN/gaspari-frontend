<script setup lang="ts">
import ProfilesList from '../components/ProfilesList.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleAddProfile = () => {
  router.push({ name: 'AddProfile' });
};
</script>

<template>
  <div>
    <h2>Profiles List <button class="btn bg-primary text-white fw-bold" @click="handleAddProfile()">Add New</button></h2>
    <ProfilesList />
  </div>
</template>
