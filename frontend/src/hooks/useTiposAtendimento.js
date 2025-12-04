import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api";

export function useTiposAtendimento(options = {}) {
  return useQuery({
    queryKey: ["tipos-atendimento"],
    queryFn: () => apiClient.get("/api/tipos-de-atendimentos"),
    select: (data) => data ?? [],
    ...options,
  });
}
