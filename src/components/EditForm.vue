<script setup lang="ts">
import { ref, onMounted } from 'vue';
import http from '../services/http';
import { useRoute } from 'vue-router';

const profile = ref({
  first_name: '',
  last_name: '',
  email: '',
  birthday: '',
  phone: '',
  address: '',
});

const route = useRoute();
const updated = ref(false);
const errors = ref({});

onMounted(fetchProfileData);

async function fetchProfileData() {
  try {
    const id = route.params.id;
    const { data: { data } } = await http.get(`/profiles/${id}`);
    profile.value = data;
  } catch (error) {
    console.log('Failed to fetch profile.', error);
  }
}

async function submit() {
  try {
    const id = route.params.id;
    await http.put(`/profiles/${id}`, profile.value);
    updated.value = true;
    errors.value = {};
  } catch (error) {
    updated.value = false;
    errors.value = (error as any).response.data.errors;
    console.log('Failed to update profile.', error);
  }
}
</script>

<template>
  <p v-if="updated" class="text-success">Profile updated successfully.</p>
  <p v-else-if="Object.keys(errors).length > 0" class="text-danger">Failed to update profile.
  <ul>
    <li v-for="error in errors" :key="error">{{ error }}</li>
  </ul>
  </p>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label for="first_name" class="form-label">First Name</label>
      <input type="text" class="form-control" id="first_name" v-model="profile.first_name">
    </div>
    <div class="mb-3">
      <label for="last_name" class="form-label">Last Name</label>
      <input type="text" class="form-control" id="last_name" v-model="profile.last_name">
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <input type="text" class="form-control" id="email" v-model="profile.email">
    </div>
    <div class="mb-3">
      <label for="birthday" class="form-label">Birthday</label>
      <input type="date" class="form-control" id="birthday" v-model="profile.birthday">
    </div>
    <div class="mb-3">
      <label for="phone" class="form-label">Phone</label>
      <input type="tel" class="form-control" id="phone" v-model="profile.phone">
    </div>
    <div class="mb-3">
      <label for="address" class="form-label">Address</label>
      <input type="text" class="form-control" id="address" v-model="profile.address">
    </div>
    <button type="submit" class="btn btn-primary">Update</button>
  </form>
</template>