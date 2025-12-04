import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../services/api";

export function useFuncionarios(options = {}) {
  return useQuery({
    queryKey: ["funcionarios"],
    queryFn: () => apiClient.get("/api/funcionarios"),
    select: (data) => data ?? [],
    ...options,
  });
}
