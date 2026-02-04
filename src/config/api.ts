/**
  * URL do caminho do BACKEND
*/
const API_BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_RAILWAY_API_URL
  : "http://localhost:3000";

/**
 * Controle de Endpoints
 * @param OBTER_CLASSIFICACAO
 * @param CRIAR_CLASSIFICACAO
 */
export const API_ENDPOINTS = {
  OBTER_CLASSIFICACAO: "/obter/classificacao",
  CRIAR_CLASSIFICACAO: "/criar/classificacao",
};

export const getApiUrl = (pathname: string): string => {
  return `${API_BASE_URL}${pathname}`;
};

export default API_BASE_URL;
