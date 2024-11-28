import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Substitua pela URL do seu backend
});

// Interceptadores (opcional, útil para autenticação ou manipulação global de erros)
api.interceptors.request.use(
  (config) => {
    // Exemplo: adicionar um token de autenticação
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Manipulação de erros globais
    if (error.response.status === 401) {
      alert("Sessão expirada. Faça login novamente.");
      // Redirecionar para a página de login, por exemplo
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
