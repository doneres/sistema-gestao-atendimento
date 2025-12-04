// frontend/src/services/fichasApi.js
import { apiClient } from "./api"; // ou "./apiClient" se esse for o nome certo

export function getEstimativaEspera(fichaId) {
  if (!fichaId) {
    throw new Error("fichaId é obrigatório");
  }
  return apiClient.get(`/api/fichas/${fichaId}/estimativa-espera`);
}
