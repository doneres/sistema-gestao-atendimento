import { useEffect, useState } from "react";
import { getEstimativaEspera } from "../../services/fichasApi";

export function EstimativaEspera({ fichaId }) {
  const [loading, setLoading] = useState(true);
  const [estimativa, setEstimativa] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        const resposta = await getEstimativaEspera(fichaId);

        if (!resposta || typeof resposta.tempoEstimadoMinutos !== "number") {
          setEstimativa(null);
        } else {
          setEstimativa(resposta.tempoEstimadoMinutos);
        }

      } catch (e) {
        console.error("Erro ao chamar IA:", e);
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [fichaId]);

  if (loading) return <span>Carregando…</span>;
  if (erro) return <span>Erro ao estimar</span>;
  if (estimativa === null) return <span>Tempo ainda não disponível</span>;

  return <span>{estimativa.toFixed(1)} min</span>;
}
