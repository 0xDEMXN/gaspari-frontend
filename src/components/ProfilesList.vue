<script setup lang="ts">
import { useRouter } from 'vue-router';
import http from '../services/http';
import { onMounted, ref } from 'vue';

interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  birthday?: string;
  phone?: string;
  address?: string;
}

const profiles = ref<Profile[]>([]);
const router = useRouter();
const deleted = ref(false);

onMounted(fetchProfileData);

async function fetchProfileData() {
  try {
    const { data: { data } } = await http.get(`/profiles`);
    profiles.value = data;
  } catch (error) {
    console.log('Failed to fetch profile.', error);
  }
}

const handleEditProfile = (id: number) => {
  router.push({ name: 'EditProfile', params: { id: id.toString() } });
};

const handleDeleteProfile = (id: number) => {
  http.delete(`/profiles/${id}`)
    .then(response => {
      console.log('Profile deleted.', response);
      deleted.value = true;
      profiles.value = profiles.value.filter((profile: Profile) => profile.id !== id);
    })
    .catch(error => {
      deleted.value = false;
      console.log('Failed to delete profile.', error);
    });
};
</script>

<template>
  <p v-if="deleted" class="text-success">Profile deleted successfully.</p>
  <ul class="list-group" v-if="profiles && profiles.length > 0">
    <li v-for="profile in profiles" :key="profile.id" class="list-group-item d-flex justify-content-between align-items-center">
      <p>{{ profile.first_name }} {{ profile.last_name }}</p>
      <div class="d-flex gap-3">
        <button class="btn btn-primary" @click="handleEditProfile(profile.id)">Edit</button>
        <button class="btn btn-danger" @click="handleDeleteProfile(profile.id)">Delete</button>
      </div>
    </li>
  </ul>
  <p v-else>There isn't any profile yet, add one!</p>
</template>