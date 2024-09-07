<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="bg-blue-600 text-white p-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold">App Name</h1>
        <div class="flex items-center">
          <span class="mr-4">Hello, {{ user.name }}</span>
          <button 
            @click="logout" 
            class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
          >
            Logout
          </button>
        </div>
      </header>
  
      <!-- Main Content -->
      <div class="flex flex-col items-center p-6 flex-1">
        <h2 class="text-3xl font-bold mb-4 text-gray-700">Your Posts</h2>
        <button 
          @click="createPost" 
          class="mb-4 px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Create Post
        </button>
        <ul class="w-full max-w-2xl space-y-4">
          <li 
            v-for="post in posts" 
            :key="post.id" 
            class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <h3 class="text-xl font-semibold text-gray-800">{{ post.title }}</h3>
            <p class="mt-2 text-gray-600">{{ post.body }}</p>
            <button
              @click="eliminarPost(post.id)" 
              class="mt-4 px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
            >
              Delete
            </button>
            <button
              @click="editarPost(post.id)" 
              class="mt-4 px-3 py-1 text-sm text-white bg-yellow-600 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-300"
            >
              Edit
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../utils/axios';
  
  export default {
    data() {
      return {
        posts: [],
        user: {
          name: 'User', // Por defecto o una cadena vacía
        },
      };
    },
    async mounted() {
      await this.fetchPosts();
      await this.fetchUser(); // Obtener la información del usuario
    },
    methods: {
      async fetchPosts() {
        try {
          const response = await axios.get('/posts');
          this.posts = response.data;
        } catch (err) {
          console.error('Failed to fetch posts:', err);
        }
      },
      async fetchUser() {
        try {
          const response = await axios.get('/user'); // Endpoint para obtener la información del usuario
          this.user = response.data;
        } catch (err) {
          console.error('Failed to fetch user info:', err);
        }
      },
      async eliminarPost(id) {
        const confirmation = confirm('¿Está seguro de que desea eliminar este post?');
        if (confirmation) {
          try {
            await axios.delete(`/posts/${id}`);
            await this.fetchPosts(); // Refrescar la lista de posts
          } catch (err) {
            console.error('Failed to delete post:', err);
          }
        }
      },
      createPost() {
        this.$router.push('/posts/create');
      },
      logout() {
        // Lógica para cerrar sesión
        axios.post('/logout').then(() => {
          this.$router.push('/login');
        }).catch(err => {
          console.error('Logout failed:', err);
        });
      },
      editarPost(id) {
        // Redirigir al formulario de edición de post
        this.$router.push(`/posts/edit/${id}`);
      },
    },
  };
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados aquí */
  </style>
  