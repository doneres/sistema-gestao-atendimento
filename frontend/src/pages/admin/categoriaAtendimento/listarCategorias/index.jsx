import { useEffect, useState } from "react";
import ModalEditarCategoria from "../../../../components/modais/ModalEditarCategoria";
import ModalConfirmarExclusao from "../../../../components/modais/ModalConfirmarExclusao";
import { apiClient, DEFAULT_ERROR_MESSAGE } from "../../../../services/api";

export default function ListarCategoriasAtendimento() {
  const [tipoAtendimento, setTipoAtendimento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [mensagem, setMensagem] = useState(null);

  // Estados dos modais
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [loadingModal, setLoadingModal] = useState(false);

  const carregarCategorias = async () => {
    setLoading(true);
    setErro(null);
    try {
      const data = await apiClient.get("/api/tipos-de-atendimentos");
      setTipoAtendimento(data ?? []);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      setErro(error?.message ?? DEFAULT_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCategorias();
  }, []);

  // Função para abrir modal de edição
  const handleEditar = (categoria) => {
    setCategoriaSelecionada(categoria);
    setShowModalEditar(true);
  };

  // Função para salvar edição
  const handleSalvarEdicao = async (dadosAtualizados) => {
    setLoadingModal(true);
    try {
      await apiClient.patch(
        `/api/tipos-de-atendimentos/${dadosAtualizados.id}`,
        dadosAtualizados
      );
      setMensagem("Categoria atualizada com sucesso!");
      carregarCategorias();
      setShowModalEditar(false);

      setTimeout(() => setMensagem(null), 3000);
    } catch (error) {
      setErro(error?.message ?? DEFAULT_ERROR_MESSAGE);
      setTimeout(() => setErro(null), 5000);
    } finally {
      setLoadingModal(false);
    }
  };

  // Função para abrir modal de exclusão
  const handleExcluir = (categoria) => {
    setCategoriaSelecionada(categoria);
    setShowModalExcluir(true);
  };

  // Função para confirmar exclusão
  const handleConfirmarExclusao = async () => {
    setLoadingModal(true);
    try {
      await apiClient.delete(
        `/api/tipos-de-atendimentos/${categoriaSelecionada.id}`
      );

      setMensagem("Categoria excluída com sucesso!");
      carregarCategorias();
      setShowModalExcluir(false);

      setTimeout(() => setMensagem(null), 3000);
    } catch (error) {
      setErro(error?.message ?? DEFAULT_ERROR_MESSAGE);
      setTimeout(() => setErro(null), 5000);
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
        Erro ao carregar as categorias de atendimento: {erro}
      </div>
    );
  }

  if (tipoAtendimento.length === 0) {
    return (
      <div className="alert alert-info mt-3" role="alert">
        <i className="bi bi-info-circle-fill me-2"></i>
        Nenhuma categoria de atendimento cadastrada no sistema.
      </div>
    );
  }

  return (
    <div className="mt-3">
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

      {/* Mensagem de erro */}
      {erro && (
        <div
          className="alert border-0 shadow-sm alert-dismissible fade show mb-3"
          role="alert"
          style={{
            background: "#fef2f2",
            borderLeft: "4px solid #ef4444",
            borderRadius: "8px",
            padding: "0.75rem 1rem",
          }}
        >
          <div className="d-flex align-items-center">
            <i
              className="bi bi-exclamation-triangle-fill me-2"
              style={{ color: "#dc2626", fontSize: "1rem" }}
            ></i>
            <span
              style={{
                color: "#991b1b",
                fontWeight: "500",
                fontSize: "0.9rem",
              }}
            >
              {erro}
            </span>
          </div>
          <button
            type="button"
            className="btn-close btn-close-sm"
            onClick={() => setErro(null)}
          ></button>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 style={{ color: "#475569" }}>
          <i className="bi bi-tags me-2"></i>
          Total: {tipoAtendimento.length}
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
                Nome Serviço
              </th>
              <th
                className="py-3 px-3 fw-semibold"
                style={{ color: "#475569" }}
              >
                Iniciais
              </th>
              <th
                className="py-3 px-3 fw-semibold"
                style={{ color: "#475569" }}
              >
                Descrição
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
            {tipoAtendimento.map((categoriasAtendimento, index) => (
              <tr
                key={categoriasAtendimento.id}
                className="table-row"
                style={{
                  background: index % 2 === 0 ? "#ffffff" : "#f1f5f9",
                }}
              >
                <td className="py-3 px-3">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "#dbeafe",
                        color: "#1e40af",
                        fontWeight: "600",
                        fontSize: "0.75rem",
                      }}
                    >
                      {categoriasAtendimento.iniciaisServico}
                    </div>
                    <span className="fw-medium" style={{ color: "#334155" }}>
                      {categoriasAtendimento.nomeServico}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      background: "#f1f5f9",
                      color: "#1e3a8a",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {categoriasAtendimento.iniciaisServico}
                  </span>
                </td>
                <td className="py-3 px-3" style={{ color: "#64748b" }}>
                  {categoriasAtendimento.descricao}
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-sm action-btn-edit"
                      title="Editar"
                      onClick={() => handleEditar(categoriasAtendimento)}
                      style={{
                        width: "32px",
                        height: "32px",
                        padding: "0",
                        border: "none",
                        background: "#fef3c7",
                        color: "#d97706",
                        borderRadius: "6px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm action-btn-delete"
                      title="Excluir"
                      onClick={() => handleExcluir(categoriasAtendimento)}
                      style={{
                        width: "32px",
                        height: "32px",
                        padding: "0",
                        border: "none",
                        background: "#fef2f2",
                        color: "#ef4444",
                        borderRadius: "6px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modais */}
      <ModalEditarCategoria
        show={showModalEditar}
        onClose={() => setShowModalEditar(false)}
        onSave={handleSalvarEdicao}
        categoria={categoriaSelecionada}
      />

      <ModalConfirmarExclusao
        show={showModalExcluir}
        onClose={() => setShowModalExcluir(false)}
        onConfirm={handleConfirmarExclusao}
        titulo="Excluir Categoria"
        mensagem={`Tem certeza que deseja excluir a categoria "${categoriaSelecionada?.nomeServico}"? Esta ação não pode ser desfeita.`}
        loading={loadingModal}
      />

      <style>{`
        .table-row:hover {
          background-color: #dbeafe !important;
          transition: background-color 0.2s ease;
        }

        .action-btn-edit:hover {
          background: #d97706 !important;
          color: white !important;
          transform: scale(1.05);
          transition: all 0.2s ease;
        }

        .action-btn-delete:hover {
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
