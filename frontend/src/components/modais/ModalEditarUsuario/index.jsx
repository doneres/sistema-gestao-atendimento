import { useState, useEffect } from "react";

export default function ModalEditarUsuario({ show, onClose, onSave, usuario }) {
  const [formData, setFormData] = useState({
    nome: "",
    username: "",
    email: "",
    telefone: "",
    dataNascimento: "",
    funcao: "",
    matricula: "",
  });

  const [loading, setLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (usuario) {
      // Formatar a data para o formato YYYY-MM-DD
      const dataFormatada = usuario.dataNascimento
        ? usuario.dataNascimento.split("T")[0]
        : "";

      setFormData({
        nome: usuario.nome || "",
        username: usuario.username || "",
        email: usuario.email || "",
        telefone: usuario.telefone || "",
        dataNascimento: dataFormatada,
        funcao: usuario.funcao || "",
        matricula: usuario.matricula?.toString() || "",
      });
    }
  }, [usuario]);

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
      // Preparar dados para envio (converter matrícula para número)
      const dadosEnvio = {
        ...formData,
        matricula: parseInt(formData.matricula, 10),
        id: usuario.id,
      };

      await onSave(dadosEnvio);
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
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div
            className="modal-content border-0 shadow-lg"
            style={{ borderRadius: "12px" }}
          >
            <div className="modal-header border-0 pb-0 pt-4 px-4">
              <h5 className="modal-title fw-bold" style={{ color: "#1e3a8a" }}>
                <i className="bi bi-pencil-square me-2"></i>
                Editar Usuário
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
                  {/* Nome */}
                  <div className="col-md-6">
                    <label
                      className="form-label fw-semibold mb-1"
                      style={{ color: "#334155", fontSize: "0.875rem" }}
                    >
                      <i
                        className="bi bi-person me-1"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
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
                      Nome é obrigatório
                    </div>
                  </div>

                  {/* Username */}
                  <div className="col-md-6">
                    <label
                      className="form-label fw-semibold mb-1"
                      style={{ color: "#334155", fontSize: "0.875rem" }}
                    >
                      <i
                        className="bi bi-at me-1"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      minLength="3"
                      pattern="^\S+$"
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
                      Username deve ter pelo menos 3 caracteres
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label
                      className="form-label fw-semibold mb-1"
                      style={{ color: "#334155", fontSize: "0.875rem" }}
                    >
                      <i
                        className="bi bi-envelope me-1"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
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
                      Email inválido
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="col-md-6">
                    <label
                      className="form-label fw-semibold mb-1"
                      style={{ color: "#334155", fontSize: "0.875rem" }}
                    >
                      <i
                        className="bi bi-telephone me-1"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Telefone
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      pattern="^[0-9]{10,11}$"
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
                      Telefone deve ter 10 ou 11 dígitos
                    </div>
                  </div>

                  {/* Data Nascimento */}
                  <div className="col-md-6">
                    <label
                      className="form-label fw-semibold mb-1"
                      style={{ color: "#334155", fontSize: "0.875rem" }}
                    >
                      <i
                        className="bi bi-calendar me-1"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Data de Nascimento
                    </label>
                    <input
                      type="date"
                      className="form-control form-control-sm"
                      name="dataNascimento"
                      value={formData.dataNascimento}
                      onChange={handleChange}
                      max={new Date().toISOString().split("T")[0]}
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
                      Data de nascimento é obrigatória
                    </div>
                  </div>

                  {/* Função */}
                  <div className="col-md-6">
                    <label
                      className="form-label fw-semibold mb-1"
                      style={{ color: "#334155", fontSize: "0.875rem" }}
                    >
                      <i
                        className="bi bi-briefcase me-1"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Função
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      name="funcao"
                      value={formData.funcao}
                      onChange={handleChange}
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
                      Função é obrigatória
                    </div>
                  </div>

                  {/* Matrícula */}
                  <div className="col-md-6">
                    <label
                      className="form-label fw-semibold mb-1"
                      style={{ color: "#334155", fontSize: "0.875rem" }}
                    >
                      <i
                        className="bi bi-hash me-1"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Matrícula
                    </label>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      name="matricula"
                      value={formData.matricula}
                      onChange={handleChange}
                      min="1"
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
                      Matrícula é obrigatória
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
        .form-control:focus {
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
