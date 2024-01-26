<script setup lang="ts">
import { ref } from 'vue';
import http from '../services/http';

const initialProfile = {
  first_name: '',
  last_name: '',
  email: '',
  birthday: '',
  phone: '',
  address: '',
};

const profile = ref({ ...initialProfile });

const created = ref(false);
const errors = ref({});

async function submit() {
  try {
    const response = await http.post(`/profiles`, profile.value);
    console.log('Profile updated.', response);
    created.value = true;
    errors.value = {};
    profile.value = { ...initialProfile };
  } catch (error) {
    created.value = false;
    errors.value = (error as any).response.data.errors;
    console.log('Failed to update profile.', error);
  }
}
</script>

<template>
  <p v-if="created" class="text-success">Profile created successfully.</p>
  <p v-else-if="Object.keys(errors).length > 0" class="text-danger">Failed to create profile.
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
      <input type="email" class="form-control" id="email" v-model="profile.email">
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
    <button type="submit" class="btn btn-primary">Create</button>
  </form>
</template>