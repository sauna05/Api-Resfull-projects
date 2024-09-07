import axios from 'axios';

// Configura la URL base de la API
axios.defaults.baseURL = 'http://localhost:8000/api';

// Interceptor para agregar el token de autenticación a las solicitudes
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axios;