<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-center text-gray-700">Register</h2>
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Name:</label>
          <input 
            type="text" 
            v-model="name" 
            required 
            class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Email:</label>
          <input 
            type="email" 
            v-model="email" 
            required 
            class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Password:</label>
          <input 
            type="password" 
            v-model="password" 
            required 
            class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Confirm Password:</label>
          <input 
            type="password" 
            v-model="password_confirmation" 
            required 
            class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
          />
        </div>
        <button 
          type="submit" 
          class="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Register
        </button>
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
      </form>
      <p class="text-center">
        Already have an account? 
        <button @click="showLogin" class="text-blue-600 hover:underline">Login</button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from '../utils/axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
        this.$router.push('/login'); // Redirigir al login
      } catch (err) {
        this.error = 'Registration failed: ' + err.response.data.message;
      }
    },
    showLogin() {
      this.$router.push('/login'); // Redirigir al login
    },
  },
};
</script>