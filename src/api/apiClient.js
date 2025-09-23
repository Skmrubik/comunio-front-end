import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // La URL base para todas las peticiones
});


// Interceptor para añadir el token a todas las peticiones
apiClient.interceptors.request.use(
  (config) => {
    // Obtener el token de las cookies
    const token = Cookies.get('user_token'); 
    
    // Si el token existe, añadirlo al header de autorización
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;