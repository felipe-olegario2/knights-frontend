import axios from 'axios';

// Configuração base do Axios
const api = axios.create({
  baseURL: 'http://localhost:3000', // Substitua pela URL da sua API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Métodos para consumir os endpoints da API
export const getKnights = async (filter?: string) => {
  const response = await api.get('/knights', {
    params: filter ? { filter } : undefined,
  });
  return response.data;
};

export const getKnightById = async (id: string) => {
  const response = await api.get(`/knights/${id}`);
  return response.data;
};

export const createKnight = async (knight: any) => {
  const response = await api.post('/knights', knight);
  return response.data;
};

export const updateKnightNickname = async (id: string, nickname: string) => {
  const response = await api.put(`/knights/${id}`, { nickname });
  return response.data;
};

export const markKnightAsHero = async (id: string) => {
  const response = await api.put(`/knights/${id}/death`);
  return response.data;
};

// Exportando a instância do Axios caso precise usá-la diretamente
export default api;
