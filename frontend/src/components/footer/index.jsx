export default function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer
      className="bg-white border-top mt-auto"
      style={{ borderColor: "#e2e8f0" }}
    >
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
              <p
                className="mb-0 fw-medium"
                style={{ color: "#64748b", fontSize: "0.875rem" }}
              >
                © {anoAtual} Sistema de Gestão de Atendimento
              </p>
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span
              className="badge rounded-pill px-3 py-2"
              style={{
                background: "#f1f5f9",
                color: "#1e3a8a",
                fontSize: "0.75rem",
                fontWeight: "500",
              }}
            >
              <i className="bi bi-code-square me-1"></i>
              Versão 1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
