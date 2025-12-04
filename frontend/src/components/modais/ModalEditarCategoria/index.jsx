import { useState, useEffect } from "react";

export default function ModalEditarCategoria({
  show,
  onClose,
  onSave,
  categoria,
}) {
  const [formData, setFormData] = useState({
    nomeServico: "",
    descricao: "",
  });

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (categoria) {
      setFormData({
        nomeServico: categoria.nomeServico || "",
        descricao: categoria.descricao || "",
      });
    }
  }, [categoria]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setLoading(true);
    try {
      await onSave({ ...formData, id: categoria.id });
      setValidated(false);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1040 }}
        onClick={onClose}
      ></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content border-0 shadow-lg"
            style={{ borderRadius: "12px" }}
          >
            <div className="modal-header border-0 pb-0 pt-4 px-4">
              <h5 className="modal-title fw-bold" style={{ color: "#1e3a8a" }}>
                <i className="bi bi-pencil-square me-2"></i>
                Editar Categoria de Atendimento
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={loading}
              ></button>
            </div>

            <form
              onSubmit={handleSubmit}
              className={`needs-validation ${validated ? "was-validated" : ""}`}
              noValidate
            >
              <div className="modal-body p-4">
                <div className="row g-3">
                  {/* Nome do Serviço */}
                  <div className="col-12">
                    <label
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
              </div>

              <div className="modal-footer border-0 px-4 pb-4">
                <button
                  type="button"
                  className="btn btn-cancelar px-3 py-2"
                  onClick={onClose}
                  disabled={loading}
                  style={{
                    background: "#f1f5f9",
                    border: "none",
                    color: "#475569",
                    borderRadius: "6px",
                    fontWeight: "500",
                  }}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-salvar px-3 py-2"
                  disabled={loading}
                  style={{
                    background: "#1e3a8a",
                    border: "none",
                    color: "white",
                    borderRadius: "6px",
                    fontWeight: "500",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Salvando...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-check-circle me-2"></i>
                      Salvar Alterações
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .form-control:focus,
        textarea.form-control:focus {
          border-color: #1e3a8a;
          box-shadow: 0 0 0 0.15rem rgba(30, 58, 138, 0.15);
        }

        .btn-salvar:hover:not(:disabled) {
          background: #1e40af !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
        }

        .btn-cancelar:hover:not(:disabled) {
          background: #e2e8f0 !important;
          color: #1e3a8a !important;
        }
      `}</style>
    </>
  );
}
