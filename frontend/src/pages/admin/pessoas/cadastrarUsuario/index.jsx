import { useState } from "react";

export default function CadastrarFuncionario() {
  const [formData, setFormData] = useState({
    nome: "",
    username: "",
    email: "",
    senha: "",
    telefone: "",
    dataNascimento: "",
    funcao: "",
    matricula: "",
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

    // Valida o formulário
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
      const response = await fetch("/api/funcionarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar funcionário");
      }

      setMensagem("Funcionário cadastrado com sucesso!");

      // Limpa o formulário e reseta a validação
      setFormData({
        nome: "",
        username: "",
        email: "",
        senha: "",
        telefone: "",
        dataNascimento: "",
        funcao: "",
        matricula: "",
      });
      setValidated(false);
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLimpar = () => {
    setFormData({
      nome: "",
      username: "",
      email: "",
      senha: "",
      telefone: "",
      dataNascimento: "",
      funcao: "",
      matricula: "",
    });
    setValidated(false);
    setMensagem(null);
    setErro(null);
  };

  return (
    <div className="mt-4">
      {/* Mensagem de sucesso */}
      {mensagem && (
        <div
          className="alert border-0 shadow-sm alert-dismissible fade show mb-4"
          role="alert"
          style={{
            background: "#d1fae5",
            borderLeft: "4px solid #10b981",
            borderRadius: "8px",
          }}
        >
          <div className="d-flex align-items-center">
            <i
              className="bi bi-check-circle-fill me-2"
              style={{ color: "#059669", fontSize: "1.25rem" }}
            ></i>
            <span style={{ color: "#065f46", fontWeight: "500" }}>
              {mensagem}
            </span>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setMensagem(null)}
          ></button>
        </div>
      )}

      {/* Mensagem de erro */}
      {erro && (
        <div
          className="alert border-0 shadow-sm alert-dismissible fade show mb-4"
          role="alert"
          style={{
            background: "#fef2f2",
            borderLeft: "4px solid #ef4444",
            borderRadius: "8px",
          }}
        >
          <div className="d-flex align-items-center">
            <i
              className="bi bi-exclamation-triangle-fill me-2"
              style={{ color: "#dc2626", fontSize: "1.25rem" }}
            ></i>
            <span style={{ color: "#991b1b", fontWeight: "500" }}>{erro}</span>
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setErro(null)}
          ></button>
        </div>
      )}

      <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
        <div className="card-body p-4">
          <form
            onSubmit={handleSubmit}
            className={`needs-validation ${validated ? "was-validated" : ""}`}
            noValidate
          >
            <div className="row g-4">
              {/* Nome */}
              <div className="col-md-6">
                <label
                  htmlFor="nome"
                  className="form-label fw-semibold"
                  style={{ color: "#334155" }}
                >
                  <i
                    className="bi bi-person me-2"
                    style={{ color: "#1e3a8a" }}
                  ></i>
                  Nome Completo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    padding: "0.75rem",
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe o nome completo.
                </div>
              </div>

              {/* Username */}
              <div className="col-md-6">
                <label
                  htmlFor="username"
                  className="form-label fw-semibold"
                  style={{ color: "#334155" }}
                >
                  <i className="bi bi-at me-2" style={{ color: "#1e3a8a" }}></i>
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  minLength="3"
                  pattern="^\S+$"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    padding: "0.75rem",
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Username deve ter pelo menos 3 caracteres e não pode conter
                  espaços.
                </div>
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label
                  htmlFor="email"
                  className="form-label fw-semibold"
                  style={{ color: "#334155" }}
                >
                  <i
                    className="bi bi-envelope me-2"
                    style={{ color: "#1e3a8a" }}
                  ></i>
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    padding: "0.75rem",
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe um email válido.
                </div>
              </div>

              {/* Senha */}
              <div className="col-md-6">
                <label
                  htmlFor="senha"
                  className="form-label fw-semibold"
                  style={{ color: "#334155" }}
                >
                  <i
                    className="bi bi-lock me-2"
                    style={{ color: "#1e3a8a" }}
                  ></i>
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="senha"
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  minLength="12"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{12,}$"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    padding: "0.75rem",
                  }}
                  required
                />
                <div className="invalid-feedback">
                  A senha deve conter no mínimo 12 caracteres, incluindo: letra
                  maiúscula, minúscula, número e caractere especial (@$!%*?&#).
                </div>
              </div>

              {/* Telefone */}
              <div className="col-md-6">
                <label
                  htmlFor="telefone"
                  className="form-label fw-semibold"
                  style={{ color: "#334155" }}
                >
                  <i
                    className="bi bi-telephone me-2"
                    style={{ color: "#1e3a8a" }}
                  ></i>
                  Telefone
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  pattern="^[0-9]{10,11}$"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    padding: "0.75rem",
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Telefone deve conter 10 ou 11 dígitos (apenas números).
                </div>
              </div>

              {/* Data de Nascimento */}
              <div className="col-md-6">
                <label
                  htmlFor="dataNascimento"
                  className="form-label fw-semibold"
                  style={{ color: "#334155" }}
                >
                  <i
                    className="bi bi-calendar me-2"
                    style={{ color: "#1e3a8a" }}
                  ></i>
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dataNascimento"
                  name="dataNascimento"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    padding: "0.75rem",
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe a data de nascimento.
                </div>
              </div>

              {/* Função */}
              <div className="col-md-6">
                <label
                  htmlFor="funcao"
                  className="form-label fw-semibold"
                  style={{ color: "#334155" }}
                >
                  <i
                    className="bi bi-briefcase me-2"
                    style={{ color: "#1e3a8a" }}
                  ></i>
                  Função
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="funcao"
                  name="funcao"
                  value={formData.funcao}
                  onChange={handleChange}
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    padding: "0.75rem",
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe a função do funcionário.
                </div>
              </div>

              {/* Matrícula */}
              <div className="col-md-6">
                <label
                  htmlFor="matricula"
                  className="form-label fw-semibold"
                  style={{ color: "#334155" }}
                >
                  <i
                    className="bi bi-hash me-2"
                    style={{ color: "#1e3a8a" }}
                  ></i>
                  Matrícula
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="matricula"
                  name="matricula"
                  value={formData.matricula}
                  onChange={handleChange}
                  min="1"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    padding: "0.75rem",
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Por favor, informe a matrícula.
                </div>
              </div>
            </div>

            {/* Botões */}
            <div
              className="d-flex gap-3 mt-4 pt-3"
              style={{ borderTop: "1px solid #e2e8f0" }}
            >
              <button
                type="submit"
                className="btn btn-cadastrar px-4 py-2"
                disabled={loading}
                style={{
                  background: "#1e3a8a",
                  border: "none",
                  color: "white",
                  borderRadius: "8px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Cadastrar
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-limpar px-4 py-2"
                onClick={handleLimpar}
                disabled={loading}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  color: "#475569",
                  borderRadius: "8px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                }}
              >
                <i className="bi bi-x-circle me-2"></i>
                Limpar
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .form-control:focus {
          border-color: #1e3a8a;
          box-shadow: 0 0 0 0.2rem rgba(30, 58, 138, 0.15);
        }

        .btn-cadastrar:hover:not(:disabled) {
          background: #1e40af !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);
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
