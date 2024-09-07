import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import RegisterForm from '../components/RegisterForm.vue';
import PostList from '../components/PostList.vue';
import CreatePost from '../components/CreatePost.vue'; // Importar el componente de crear post

Vue.use(VueRouter);
//configurar rutas de cada componente
const routes = [
  { path: '/login', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/posts', component: PostList },
  { path: '/posts/create', component: CreatePost }, // Agregar la ruta para crear un post
  { path: 'logout', redirect: '/login' },
  { path: '*', redirect: '/login' }, // Redirigir a login si la ruta no existe
];

const router = new VueRouter({
  routes,
});

export default router;