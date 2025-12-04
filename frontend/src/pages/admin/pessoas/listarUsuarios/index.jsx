import { useState, useEffect } from "react";
import ModalConfirmarExclusao from "../../../../components/modais/ModalConfirmarExclusao";
import ModalEditarUsuario from "../../../../components/modais/ModalEditarUsuario";
import { apiClient, DEFAULT_ERROR_MESSAGE } from "../../../../services/api";

export default function ListarUsuarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  // Estados dos modais
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const carregarFuncionarios = async () => {
    setLoading(true);
    setErro(null);
    try {
      const data = await apiClient.get("/api/funcionarios");
      setFuncionarios(data ?? []);
    } catch (error) {
      console.error("Erro ao carregar funcionários:", error);
      setErro(error?.message ?? DEFAULT_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  // Função para abrir modal de edição
  const handleEditar = (funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setShowModalEditar(true);
  };

  // Função para salvar edição
  const handleSalvarEdicao = async (dadosAtualizados) => {
    setLoadingModal(true);
    try {
      await apiClient.patch(
        `/api/funcionarios/${dadosAtualizados.id}`,
        dadosAtualizados
      );

      setMensagem("Funcionário atualizado com sucesso!");
      carregarFuncionarios();
      setShowModalEditar(false);

      setTimeout(() => setMensagem(null), 3000);
    } catch (error) {
      setErro(error?.message ?? DEFAULT_ERROR_MESSAGE);
    } finally {
      setLoadingModal(false);
    }
  };

  // Função para abrir modal de exclusão
  const handleExcluir = (funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setShowModalExcluir(true);
  };

  // Função para confirmar exclusão
  const handleConfirmarExclusao = async () => {
    setLoadingModal(true);
    try {
      await apiClient.delete(`/api/funcionarios/${funcionarioSelecionado.id}`);

      setMensagem("Funcionário excluído com sucesso!");
      carregarFuncionarios();
      setShowModalExcluir(false);

      setTimeout(() => setMensagem(null), 3000);
    } catch (error) {
      setErro(error?.message ?? DEFAULT_ERROR_MESSAGE);
    } finally {
      setLoadingModal(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="alert alert-danger mt-3" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        Erro ao carregar funcionários: {erro}
      </div>
    );
  }

  if (funcionarios.length === 0) {
    return (
      <div className="alert alert-info mt-3" role="alert">
        <i className="bi bi-info-circle-fill me-2"></i>
        Nenhum funcionário cadastrado no sistema.
      </div>
    );
  }

  const formatarData = (dataString) => {
    if (!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString("pt-BR");
  };

  return (
    <div className="mt-4">
      {/* Mensagem de sucesso */}
      {mensagem && (
        <div
          className="alert border-0 shadow-sm alert-dismissible fade show mb-3"
          role="alert"
          style={{
            background: "#d1fae5",
            borderLeft: "4px solid #10b981",
            borderRadius: "8px",
            padding: "0.75rem 1rem",
          }}
        >
          <div className="d-flex align-items-center">
            <i
              className="bi bi-check-circle-fill me-2"
              style={{ color: "#059669", fontSize: "1rem" }}
            ></i>
            <span
              style={{
                color: "#065f46",
                fontWeight: "500",
                fontSize: "0.9rem",
              }}
            >
              {mensagem}
            </span>
          </div>
          <button
            type="button"
            className="btn-close btn-close-sm"
            onClick={() => setMensagem(null)}
          ></button>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 style={{ color: "#475569" }}>
          <i className="bi bi-people me-2"></i>
          Total: {funcionarios.length}
        </h5>
      </div>

      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead
            style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}
          >
            <tr>
              <th
                className="py-3 px-3 fw-semibold"
                style={{ color: "#475569" }}
              >
                Nome
              </th>
              <th
                className="py-3 px-3 fw-semibold"
                style={{ color: "#475569" }}
              >
                Username
              </th>
              <th
                className="py-3 px-3 fw-semibold"
                style={{ color: "#475569" }}
              >
                Email
              </th>
              <th
                className="py-3 px-3 fw-semibold"
                style={{ color: "#475569" }}
              >
                Telefone
              </th>
              <th
                className="py-3 px-3 fw-semibold"
                style={{ color: "#475569" }}
              >
                Data Nascimento
              </th>
              <th
                className="py-3 px-3 fw-semibold"
                style={{ color: "#475569" }}
              >
                Função
              </th>
              <th
                className="py-3 px-3 fw-semibold"
                style={{ color: "#475569" }}
              >
                Matrícula
              </th>
              <th
                className="py-3 px-3 fw-semibold text-center"
                style={{ color: "#475569" }}
              >
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {funcionarios.map((funcionario, index) => (
              <tr
                key={funcionario.id}
                className="table-row"
                style={{ background: index % 2 === 0 ? "#ffffff" : "#f1f5f9" }}
              >
                <td className="py-3 px-3" style={{ color: "#334155" }}>
                  {funcionario.nome}
                </td>
                <td className="py-3 px-3" style={{ color: "#64748b" }}>
                  {funcionario.username}
                </td>
                <td className="py-3 px-3" style={{ color: "#64748b" }}>
                  {funcionario.email}
                </td>
                <td className="py-3 px-3" style={{ color: "#64748b" }}>
                  {funcionario.telefone}
                </td>
                <td className="py-3 px-3" style={{ color: "#64748b" }}>
                  {formatarData(funcionario.dataNascimento)}
                </td>
                <td className="py-3 px-3">
                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background: "#dbeafe",
                      color: "#1e40af",
                      fontSize: "0.8rem",
                      fontWeight: "500",
                    }}
                  >
                    {funcionario.funcao}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <span className="font-monospace" style={{ color: "#64748b" }}>
                    {funcionario.matricula}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <button
                    className="btn btn-sm me-2 btn-action-edit"
                    title="Editar"
                    onClick={() => handleEditar(funcionario)}
                    style={{
                      background: "#fef3c7",
                      border: "none",
                      color: "#d97706",
                      borderRadius: "6px",
                      width: "32px",
                      height: "32px",
                    }}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-action-delete"
                    title="Excluir"
                    onClick={() => handleExcluir(funcionario)}
                    style={{
                      background: "#fef2f2",
                      border: "none",
                      color: "#ef4444",
                      borderRadius: "6px",
                      width: "32px",
                      height: "32px",
                    }}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modais */}
      <ModalEditarUsuario
        show={showModalEditar}
        onClose={() => setShowModalEditar(false)}
        onSave={handleSalvarEdicao}
        usuario={funcionarioSelecionado}
      />

      <ModalConfirmarExclusao
        show={showModalExcluir}
        onClose={() => setShowModalExcluir(false)}
        onConfirm={handleConfirmarExclusao}
        titulo="Excluir Usuário"
        mensagem={`Tem certeza que deseja excluir o usuário "${funcionarioSelecionado?.nome}"? Esta ação não pode ser desfeita.`}
        loading={loadingModal}
      />

      <style>{`
        .table-row:hover {
          background-color: #dbeafe !important;
          transition: background-color 0.2s ease;
        }

        .btn-action-edit:hover {
          background: #d97706 !important;
          color: white !important;
          transform: scale(1.05);
          transition: all 0.2s ease;
        }

        .btn-action-delete:hover {
          background: #ef4444 !important;
          color: white !important;
          transform: scale(1.05);
          transition: all 0.2s ease;
        }

        .table {
          border-collapse: separate;
          border-spacing: 0;
        }
      `}</style>
    </div>
  );
}
