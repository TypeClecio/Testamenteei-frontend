// Configuração centralizada da API
const API_BASE_URL = import.meta.env.VITE_RAILWAY_API_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  TOP_JOGADORES: "/obter/classificacao",
  SALVAR_JOGADOR: "/criar/classificacao",
};

export const getApiUrl = (pathname: string): string => {
  return `${API_BASE_URL}${pathname}`;
};

export default API_BASE_URL;
