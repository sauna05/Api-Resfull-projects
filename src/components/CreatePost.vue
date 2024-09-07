<template>
  <div class="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
    <h2 class="text-3xl font-bold mb-4 text-gray-700">Crear Nuevo Post</h2>
    <form @submit.prevent="createPost" class="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-600">Título:</label>
        <input 
          id="title" 
          type="text" 
          v-model="title" 
          required 
          class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
        />
      </div>
      <div class="mb-4">
        <label for="body" class="block text-sm font-medium text-gray-600">Contenido:</label>
        <textarea 
          id="body" 
          v-model="body" 
          required 
          rows="4" 
          class="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" 
        ></textarea>
      </div>
      <button 
        type="submit" 
        class="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Crear Post
      </button>
      <p v-if="error" class="mt-4 text-red-500 text-sm">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import axios from '../utils/axios';

export default {
  data() {
    return {
      title: '',
      body: '',
      error: '',
    };
  },
  methods: {
    async createPost() {
      try {
        await axios.post('/posts', {
          title: this.title,
          body: this.body,
        });
        this.$router.push('/posts'); // Redirigir a la lista de posts
      } catch (err) {
        this.error = 'Error al crear el post: ' + err.response.data.message;
      }
    },
  },
};
</script>