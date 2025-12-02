import { useState } from "react";
import styled from "styled-components";

const Card = styled.section`
  background: #fff;
  border-radius: 14px;
  border: 1px solid #e4e7ec;
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f172a;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 0.88rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: #0f172a;
`;

const Select = styled.select`
  border-radius: 10px;
  border: 1px solid #d5dcf5;
  padding: 0.65rem 0.75rem;
  font-size: 0.95rem;
  transition: border 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #1d4ed8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.25);
  }
`;

const Helper = styled.p`
  font-size: 0.8rem;
  color: #475569;
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const PrimaryButton = styled.button`
  background: #1d4ed8;
  color: #fff;
  border: none;
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover:enabled {
    transform: translateY(-1px);
    box-shadow: 0 8px 18px rgba(59, 130, 246, 0.35);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #475569;
  border: 1px solid #d5dcf5;
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  font-weight: 500;
  transition: color 0.2s ease, border 0.2s ease;

  &:hover:enabled {
    color: #1d4ed8;
    border-color: #94a3b8;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

const InlineError = styled.span`
  color: #dc2626;
  font-size: 0.8rem;
`;

export default function FichaForm({
  valores,
  onChange,
  onSubmit,
  onReset,
  tipos,
  funcionarios,
  carregandoTipos,
  carregandoFuncionarios,
  criandoFicha,
}) {
  const [erroLocal, setErroLocal] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!valores.tipoServicoId) {
      setErroLocal("Selecione um tipo de atendimento.");
      return;
    }

    setErroLocal("");
    onSubmit(valores);
  };

  const handleReset = () => {
    setErroLocal("");
    onReset();
  };

  return (
    <Card>
      <Header>
        <Title>Gerar nova ficha</Title>
        <Subtitle>
          Escolha o serviço, defina (se necessário) quem atenderá e registre a
          ficha em poucos cliques.
        </Subtitle>
      </Header>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Tipo de atendimento *</Label>
          <Select
            name="tipoServicoId"
            value={valores.tipoServicoId}
            onChange={onChange}
            disabled={carregandoTipos || tipos.length === 0}
          >
            <option value="">
              {carregandoTipos ? "Carregando..." : "Selecione"}
            </option>
            {tipos.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nomeServico ?? tipo.nome ?? tipo.descricao ?? tipo.id}
              </option>
            ))}
          </Select>
          {erroLocal && <InlineError>{erroLocal}</InlineError>}
        </Field>

        <Field>
          <Label>Funcionário (opcional)</Label>
          <Select
            name="funcionarioId"
            value={valores.funcionarioId}
            onChange={onChange}
            disabled={carregandoFuncionarios}
          >
            <option value="">Sem responsável definido</option>
            {funcionarios.map((funcionario) => (
              <option key={funcionario.id} value={funcionario.id}>
                {funcionario.nome ?? funcionario.id}
              </option>
            ))}
          </Select>
        </Field>

        <Helper>
          Status inicial definido automaticamente como{" "}
          <strong>AGUARDANDO</strong>. Datas de início e fim serão preenchidas
          conforme o atendimento evoluir.
        </Helper>

        <Actions>
          <PrimaryButton type="submit" disabled={criandoFicha}>
            {criandoFicha ? "Gerando..." : "Criar ficha"}
          </PrimaryButton>
          <SecondaryButton
            type="button"
            onClick={handleReset}
            disabled={criandoFicha}
          >
            Limpar
          </SecondaryButton>
        </Actions>
      </Form>
    </Card>
  );
}
