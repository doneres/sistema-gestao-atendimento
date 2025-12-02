import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const Card = styled.section`
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e4e7ec;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
`;

const RefreshButton = styled.button`
  border: 1px solid #d6dbf5;
  color: #1e3a8a;
  background: #eef2ff;
  padding: 0.45rem 1.15rem;
  border-radius: 999px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover:enabled {
    background: #1e3a8a;
    color: #fff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Summary = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const SummaryCard = styled.div`
  flex: 1;
  min-width: 140px;
  background: #f7f9fc;
  border-radius: 12px;
  padding: 0.85rem 1rem;
  border: 1px solid #edf1f7;
`;

const SummaryLabel = styled.p`
  margin: 0;
  font-size: 0.78rem;
  color: #64748b;
`;

const SummaryValue = styled.p`
  margin: 0.1rem 0 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    font-size: 0.75rem;
    letter-spacing: 0.04em;
    color: #94a3b8;
    font-weight: 700;
    padding: 0.65rem 0.4rem;
    text-transform: uppercase;
    text-align: left;
  }

  td {
    padding: 0.75rem 0.4rem;
    font-size: 0.9rem;
    color: #1e293b;
    border-top: 1px solid #edf2f7;
  }
`;

const StatusSelect = styled.select`
  border: 1px solid #d5dcf5;
  border-radius: 999px;
  padding: 0.35rem 0.9rem;
  font-size: 0.78rem;
  font-weight: 600;
  background: #f8f9ff;
  color: #1d3f91;

  &:disabled {
    opacity: 0.7;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const ActionButton = styled.button`
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.35rem 0.75rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #475569;
  background: #fff;
  transition: all 0.2s;

  &:hover:enabled {
    color: #1d4ed8;
    border-color: #c7d2fe;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const TransferSelect = styled.select`
  border: 1px solid #cbd5f5;
  border-radius: 8px;
  padding: 0.4rem 0.5rem;
  font-size: 0.85rem;
`;

const InlineNote = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
`;

const EmptyMessage = styled.p`
  margin: 2rem 0;
  text-align: center;
  color: #94a3b8;
`;

const STATUS_OPTIONS = [
  "AGUARDANDO",
  "EM_ANDAMENTO",
  "FINALIZADO",
  "CANCELADO",
];

const selectValue = (value) =>
  value === null || value === undefined ? "" : String(value);

const formatDateTime = (value) => {
  if (!value) return "-";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
};

export default function FichaList({
  fichas,
  carregando,
  onRefresh,
  atualizando,
  funcionarios,
  onChangeStatus,
  onTransfer,
  statusEmAtualizacao,
  transferindoId,
}) {
  const [linhaTransferindo, setLinhaTransferindo] = useState(null);

  useEffect(() => {
    if (transferindoId === null || transferindoId === undefined) {
      setLinhaTransferindo(null);
    }
  }, [transferindoId]);

  const resumo = useMemo(() => {
    if (!fichas?.length) {
      return { total: 0, aguardando: 0, emAtendimento: 0 };
    }
    return fichas.reduce(
      (acc, ficha) => {
        acc.total += 1;
        if (ficha.status === "AGUARDANDO") acc.aguardando += 1;
        if (ficha.status === "EM_ANDAMENTO") acc.emAtendimento += 1;
        return acc;
      },
      { total: 0, aguardando: 0, emAtendimento: 0 }
    );
  }, [fichas]);

  const toggleTransfer = (id) => {
    setLinhaTransferindo((prev) => (prev === id ? null : id));
  };

  const handleTransferChange = (ficha, value) => {
    if (value === selectValue(ficha.funcionario?.id)) {
      setLinhaTransferindo(null);
      return;
    }

    onTransfer(ficha.id, value);
  };

  const handleStatusSelect = (ficha, value) => {
    if (value === ficha.status) return;
    onChangeStatus(ficha.id, value);
  };

  return (
    <Card>
      <Header>
        <Title>Fichas recentes</Title>
        <RefreshButton type="button" onClick={onRefresh} disabled={atualizando}>
          {atualizando ? "Atualizando..." : "Atualizar"}
        </RefreshButton>
      </Header>

      <Summary>
        <SummaryCard>
          <SummaryLabel>Total</SummaryLabel>
          <SummaryValue>{resumo.total}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>Aguardando</SummaryLabel>
          <SummaryValue>{resumo.aguardando}</SummaryValue>
        </SummaryCard>
        <SummaryCard>
          <SummaryLabel>Em andamento</SummaryLabel>
          <SummaryValue>{resumo.emAtendimento}</SummaryValue>
        </SummaryCard>
      </Summary>

      {carregando ? (
        <EmptyMessage>Carregando fichas...</EmptyMessage>
      ) : fichas.length === 0 ? (
        <EmptyMessage>Nenhuma ficha registrada até o momento.</EmptyMessage>
      ) : (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Status</th>
                <th>Funcionário</th>
                <th>Entrada</th>
                <th>Início</th>
                <th>Fim</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {fichas.map((ficha) => (
                <tr key={ficha.id}>
                  <td>
                    {ficha.tipoServicoPrestado?.nomeServico ??
                      ficha.tipoServicoPrestado?.nome ??
                      ficha.tipoServicoPrestado?.descricao ??
                      "-"}
                  </td>
                  <td>
                    <StatusSelect
                      value={ficha.status ?? "AGUARDANDO"}
                      onChange={(event) =>
                        handleStatusSelect(ficha, event.target.value)
                      }
                      disabled={statusEmAtualizacao === ficha.id}
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status.replaceAll("_", " ")}
                        </option>
                      ))}
                    </StatusSelect>
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                      }}
                    >
                      <span>{ficha.funcionario?.nome ?? "—"}</span>
                      {linhaTransferindo === ficha.id && (
                        <TransferSelect
                          value={selectValue(ficha.funcionario?.id)}
                          onChange={(event) =>
                            handleTransferChange(ficha, event.target.value)
                          }
                          disabled={transferindoId === ficha.id}
                        >
                          <option value="">Sem responsável</option>
                          {funcionarios.map((func) => (
                            <option key={func.id} value={String(func.id)}>
                              {func.nome}
                            </option>
                          ))}
                        </TransferSelect>
                      )}
                      {transferindoId === ficha.id && (
                        <InlineNote>Salvando...</InlineNote>
                      )}
                    </div>
                  </td>
                  <td>{formatDateTime(ficha.dataHoraEntradaFila)}</td>
                  <td>{formatDateTime(ficha.dataHoraInicioAtendimento)}</td>
                  <td>{formatDateTime(ficha.dataHoraFimAtendimento)}</td>
                  <td>
                    <Actions>
                      <ActionButton
                        type="button"
                        onClick={() => toggleTransfer(ficha.id)}
                        disabled={transferindoId === ficha.id}
                      >
                        {linhaTransferindo === ficha.id
                          ? "Cancelar"
                          : "Transferir"}
                      </ActionButton>
                    </Actions>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      )}
    </Card>
  );
}
