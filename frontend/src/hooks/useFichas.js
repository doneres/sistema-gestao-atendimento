import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../services/api";

const buildPayload = (values) => ({
  tipoServicoPrestado: { id: values.tipoServicoId },
  funcionario: values.funcionarioId ? { id: values.funcionarioId } : null,
  status: "AGUARDANDO",
  dataHoraInicioAtendimento: null,
  dataHoraFimAtendimento: null,
});

export function useFichas() {
  const queryClient = useQueryClient();

  const fichasQuery = useQuery({
    queryKey: ["fichas"],
    queryFn: () => apiClient.get("/api/fichas"),
    select: (data) => data ?? [],
  });

  const criarFichaMutation = useMutation({
    mutationFn: (values) => apiClient.post("/api/fichas", buildPayload(values)),
    onSuccess: (novaFicha) => {
      queryClient.setQueryData(["fichas"], (dadosAntigos = []) => [
        novaFicha,
        ...dadosAntigos,
      ]);
    },
  });

  const atualizarFichaMutation = useMutation({
    mutationFn: ({ id, data }) => apiClient.patch(`/api/fichas/${id}`, data),
    onSuccess: (fichaAtualizada) => {
      queryClient.setQueryData(["fichas"], (dados = []) =>
        dados.map((ficha) =>
          ficha.id === fichaAtualizada.id ? fichaAtualizada : ficha
        )
      );
    },
  });

  return {
    ...fichasQuery,
    criarFicha: criarFichaMutation.mutateAsync,
    criandoFicha: criarFichaMutation.isPending,
    atualizarFicha: atualizarFichaMutation.mutateAsync,
  };
}
