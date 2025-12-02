import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import FichaForm from "../../components/fichas/FichaForm";
import FichaList from "../../components/fichas/FichaList";
import { useFichas } from "../../hooks/useFichas";
import { useTiposAtendimento } from "../../hooks/useTiposAtendimento";
import { useFuncionarios } from "../../hooks/useFuncionarios";

const Page = styled.main`
  background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: calc(100vh - 120px);
  padding: 2.5rem 0 3rem;
`;

const Container = styled.div`
  width: min(1200px, 100%);
  margin: 0 auto;
  padding: 0 1.25rem;
`;

const Hero = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const HeroIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: linear-gradient(135deg, #312e81 0%, #6366f1 100%);
  color: white;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 800;
  color: #0f172a;
`;

const HeroSubtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 1rem;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1.4fr;
  }
`;

const ErrorBanner = styled.div`
  background: #fee2e2;
  border-radius: 12px;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: 0.85rem 1.25rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
`;

const initialFormValues = {
  tipoServicoId: "",
  funcionarioId: "",
};

export default function GerenciarFichas() {
  const [formValues, setFormValues] = useState(initialFormValues);

  const {
    data: fichas = [],
    isLoading: carregandoFichas,
    isFetching,
    error: erroFichas,
    refetch,
    criarFicha,
    criandoFicha,
    atualizarFicha,
  } = useFichas();

  const {
    data: tiposAtendimento = [],
    isLoading: carregandoTipos,
    error: erroTipos,
  } = useTiposAtendimento();

  const {
    data: funcionarios = [],
    isLoading: carregandoFuncionarios,
    error: erroFuncionarios,
  } = useFuncionarios();

  const erroGeral = useMemo(
    () => erroFichas || erroTipos || erroFuncionarios,
    [erroFichas, erroTipos, erroFuncionarios]
  );

  useEffect(() => {
    if (erroGeral) {
      toast.error(erroGeral?.message ?? "Não foi possível carregar os dados.");
    }
  }, [erroGeral]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (values) => {
    try {
      await criarFicha(values);
      toast.success("Ficha criada com sucesso!");
      setFormValues(initialFormValues);
    } catch (error) {
      toast.error(error?.message ?? "Não foi possível criar a ficha.");
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const [statusAtualizandoId, setStatusAtualizandoId] = useState(null);
  const [transferindoFichaId, setTransferindoFichaId] = useState(null);

  const handleStatusChange = async (id, novoStatus) => {
    setStatusAtualizandoId(id);
    try {
      await atualizarFicha({ id, data: { status: novoStatus } });
      toast.success("Status atualizado.");
    } catch (error) {
      toast.error(error?.message ?? "Não foi possível atualizar o status.");
    } finally {
      setStatusAtualizandoId(null);
    }
  };

  const handleTransfer = async (id, novoFuncionarioId) => {
    setTransferindoFichaId(id);
    try {
      await atualizarFicha({
        id,
        data: {
          funcionario: novoFuncionarioId
            ? { id: Number(novoFuncionarioId) }
            : null,
        },
      });
      toast.success("Ficha transferida.");
    } catch (error) {
      toast.error(error?.message ?? "Não foi possível transferir a ficha.");
    } finally {
      setTransferindoFichaId(null);
    }
  };

  return (
    <Page>
      <Container>
        <Hero>
          <HeroIcon>
            <i className="bi bi-journal-check"></i>
          </HeroIcon>
          <HeroText>
            <HeroTitle>Gerenciar fichas</HeroTitle>
            <HeroSubtitle>
              Abra fichas, distribua a fila e acompanhe o avanço em tempo real.
            </HeroSubtitle>
          </HeroText>
        </Hero>

        {erroGeral && (
          <ErrorBanner>
            Não foi possível carregar todas as informações. Tente atualizar a
            página.
          </ErrorBanner>
        )}

        <Grid>
          <FichaForm
            valores={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onReset={() => setFormValues(initialFormValues)}
            tipos={tiposAtendimento}
            funcionarios={funcionarios}
            carregandoTipos={carregandoTipos}
            carregandoFuncionarios={carregandoFuncionarios}
            criandoFicha={criandoFicha}
          />

          <FichaList
            fichas={fichas}
            carregando={carregandoFichas}
            onRefresh={handleRefresh}
            atualizando={isFetching && !carregandoFichas}
            funcionarios={funcionarios}
            onChangeStatus={handleStatusChange}
            onTransfer={handleTransfer}
            statusEmAtualizacao={statusAtualizandoId}
            transferindoId={transferindoFichaId}
          />
        </Grid>
      </Container>
    </Page>
  );
}
