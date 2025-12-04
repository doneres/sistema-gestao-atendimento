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
        console.log("Resposta da IA para ficha", fichaId, resposta);

        let valorNumero = null;

        if (resposta && typeof resposta === "object") {
          // 1º: tenta campo com nome "tempoEstimadoMinutos"
          if (typeof resposta.tempoEstimadoMinutos === "number") {
            valorNumero = resposta.tempoEstimadoMinutos;
          } else {
            // 2º: se não tiver, pega o primeiro campo numérico que encontrar
            for (const [chave, valor] of Object.entries(resposta)) {
              if (typeof valor === "number" && Number.isFinite(valor)) {
                valorNumero = valor;
                console.log(
                  "Usando campo numérico",
                  chave,
                  "como tempo estimado"
                );
                break;
              }
            }
          }
        }

        setEstimativa(valorNumero);
      } catch (e) {
        console.error("Erro ao chamar IA:", e);
        setErro(true);
      } finally {
        setLoading(false);
      }
    }

    if (fichaId) {
      carregar();
    }
  }, [fichaId]);

  if (loading) return <span>Calculando…</span>;
  if (erro) return <span>Erro ao estimar</span>;
  if (estimativa === null) return <span>Tempo ainda não disponível</span>;

  const valorFormatado = estimativa.toFixed(1);

  return (
    <span>
      Tempo estimado: <strong>{valorFormatado} min</strong>
    </span>
  );
}
