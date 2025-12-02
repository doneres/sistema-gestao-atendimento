import { useState } from "react";
import { apiClient, DEFAULT_ERROR_MESSAGE } from "../../../../services/api";

export default function CadastrarCategoriaAtendimento() {
  const [formData, setFormData] = useState({
    nomeServico: "",
    descricao: "",
  });

  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [erro, setErro] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setLoading(true);
    setMensagem(null);
    setErro(null);

    try {
      await apiClient.post("/api/tipos-de-atendimentos", formData);

      setMensagem("Categoria de atendimento cadastrada com sucesso!");

      setFormData({
        nomeServico: "",
        descricao: "",
      });
      setValidated(false);
    } catch (error) {
      setErro(error?.message ?? DEFAULT_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  const handleLimpar = () => {
    setFormData({
      nomeServico: "",
      descricao: "",
    });
    setValidated(false);
    setMensagem(null);
    setErro(null);
  };

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

      <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
        <div className="card-body p-3">
          <form
            onSubmit={handleSubmit}
            className={`needs-validation ${validated ? "was-validated" : ""}`}
            noValidate
          >
            <div className="row g-3">
              {/* Nome do Serviço */}
              <div className="col-12">
                <label
                  htmlFor="nomeServico"
                  className="form-label fw-semibold mb-1"
                  style={{ color: "#334155", fontSize: "0.875rem" }}
                >
                  <i
                    className="bi bi-tag me-1"
                    style={{ color: "#1e3a8a" }}
                  ></i>
                  Nome do Serviço
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="nomeServico"
                  name="nomeServico"
                  value={formData.nomeServico}
                  onChange={handleChange}
                  minLength="3"
                  pattern="^[A-Za-zÀ-ÿ\s]+$"
                  style={{
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    padding: "0.5rem",
                  }}
                  required
                />
                <div
                  className="invalid-feedback"
                  style={{ fontSize: "0.75rem" }}
                >
                  Nome do serviço deve ter pelo menos 3 caracteres e conter
                  apenas letras.
                </div>
              </div>

              {/* Descrição */}
              <div className="col-12">
                <label
                  htmlFor="descricao"
                  className="form-label fw-semibold mb-1"
                  style={{ color: "#334155", fontSize: "0.875rem" }}
                >
                  <i
                    className="bi bi-text-paragraph me-1"
                    style={{ color: "#1e3a8a" }}
                  ></i>
                  Descrição Completa
                </label>
                <textarea
                  className="form-control form-control-sm"
                  id="descricao"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows="3"
                  minLength="5"
                  maxLength="500"
                  style={{
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    padding: "0.5rem",
                    resize: "vertical",
                  }}
                  required
                ></textarea>
                <div
                  className="invalid-feedback"
                  style={{ fontSize: "0.75rem" }}
                >
                  Descrição deve ter entre 5 e 500 caracteres.
                </div>
                <div
                  className="form-text"
                  style={{ fontSize: "0.75rem", color: "#64748b" }}
                >
                  {formData.descricao.length}/500 caracteres
                </div>
              </div>
            </div>

            {/* Botões */}
            <div
              className="d-flex gap-2 mt-3 pt-2"
              style={{ borderTop: "1px solid #e2e8f0" }}
            >
              <button
                type="submit"
                className="btn btn-cadastrar btn-sm px-3"
                disabled={loading}
                style={{
                  background: "#1e3a8a",
                  border: "none",
                  color: "white",
                  borderRadius: "6px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                    ></span>
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-1"></i>
                    Cadastrar
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-limpar btn-sm px-3"
                onClick={handleLimpar}
                disabled={loading}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  color: "#475569",
                  borderRadius: "6px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                }}
              >
                <i className="bi bi-x-circle me-1"></i>
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .form-control:focus,
        textarea.form-control:focus {
          border-color: #1e3a8a;
          box-shadow: 0 0 0 0.15rem rgba(30, 58, 138, 0.15);
        }

        .btn-cadastrar:hover:not(:disabled) {
          background: #1e40af !important;
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(30, 58, 138, 0.25);
        }

        .btn-limpar:hover:not(:disabled) {
          background: #e2e8f0 !important;
          color: #1e3a8a !important;
        }

        .btn-cadastrar:disabled,
        .btn-limpar:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
