export default function Atendimento() {
  return (
    <div className="container py-5">
      {/* Header da página */}
      <div className="mb-5">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: "56px",
              height: "56px",
              background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            }}
          >
            <i
              className="bi bi-person-vcard text-white"
              style={{ fontSize: "1.75rem" }}
            ></i>
          </div>
          <div>
            <h1
              className="fw-bold mb-1"
              style={{ color: "#1e3a8a", fontSize: "2rem" }}
            >
              Atendimento
            </h1>
            <p className="text-muted mb-0">
              Gerencie seus atendimentos de forma eficiente
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .card-action:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(30, 58, 138, 0.12) !important;
        }
      `}</style>
    </div>
  );
}
