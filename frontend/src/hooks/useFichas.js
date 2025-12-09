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

  // 🔹 Buscar todas as fichas
  const fichasQuery = useQuery({
    queryKey: ["fichas"],
    queryFn: () => apiClient.get("/api/fichas"),
    select: (data) => data ?? [],
  });

  // 🔹 Criar ficha
  const criarFichaMutation = useMutation({
    mutationFn: (values) => apiClient.post("/api/fichas", buildPayload(values)),
    onSuccess: (novaFicha) => {
      queryClient.setQueryData(["fichas"], (dadosAntigos = []) => [
        novaFicha,
        ...dadosAntigos,
      ]);
    },
  });

  // 🔹 Atualizar ficha (PATCH parcial)
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

  // 🔹 Deletar ficha
  const deletarFichaMutation = useMutation({
    mutationFn: (id) => apiClient.delete(`/api/fichas/${id}`),
    onSuccess: (_, id) => {
      // remove a ficha apagada do cache
      queryClient.setQueryData(["fichas"], (dados = []) =>
        dados.filter((ficha) => ficha.id !== id)
      );
    },
  });

  return {
    ...fichasQuery,
    criarFicha: criarFichaMutation.mutateAsync,
    criandoFicha: criarFichaMutation.isPending,
    atualizarFicha: atualizarFichaMutation.mutateAsync,
    deletarFicha: deletarFichaMutation.mutateAsync,
    deletandoFicha: deletarFichaMutation.isPending,
  };
}
