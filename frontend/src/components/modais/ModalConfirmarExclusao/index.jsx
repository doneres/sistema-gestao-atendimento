export default function ModalConfirmarExclusao({
  show,
  onClose,
  onConfirm,
  titulo,
  mensagem,
  loading,
}) {
  if (!show) return null;

  return (
    <>
      <div
        className="modal-backdrop fade show"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={onClose}
      ></div>

      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div
            className="modal-content border-0 shadow-lg"
            style={{ borderRadius: "12px" }}
          >
            <div className="modal-body p-4">
              <div className="text-center mb-4">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{
                    width: "64px",
                    height: "64px",
                    background: "#fef2f2",
                  }}
                >
                  <i
                    className="bi bi-exclamation-triangle-fill"
                    style={{ fontSize: "2rem", color: "#ef4444" }}
                  ></i>
                </div>
                <h5 className="fw-bold mb-2" style={{ color: "#1e3a8a" }}>
                  {titulo}
                </h5>
                <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                  {mensagem}
                </p>
              </div>

              <div className="d-flex gap-2 justify-content-center">
                <button
                  type="button"
                  className="btn btn-cancelar px-4 py-2"
                  onClick={onClose}
                  disabled={loading}
                  style={{
                    background: "#f1f5f9",
                    border: "none",
                    color: "#475569",
                    borderRadius: "8px",
                    fontWeight: "500",
                  }}
                >
                  <i className="bi bi-x-circle me-2"></i>
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-confirmar px-4 py-2"
                  onClick={onConfirm}
                  disabled={loading}
                  style={{
                    background: "#ef4444",
                    border: "none",
                    color: "white",
                    borderRadius: "8px",
                    fontWeight: "500",
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Excluindo...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-trash me-2"></i>
                      Confirmar Exclusão
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .btn-cancelar:hover:not(:disabled) {
          background: #e2e8f0 !important;
          color: #1e3a8a !important;
        }

        .btn-confirmar:hover:not(:disabled) {
          background: #dc2626 !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
      `}</style>
    </>
  );
}
