import { Link } from "react-router";

export default function Home() {
  return (
    <div className="container py-5">
      <div className="mb-5">
        <h1
          className="fw-bold mb-2"
          style={{ color: "#1e3a8a", fontSize: "2rem" }}
        >
          Seus acessos
        </h1>
      </div>

      <div className="row g-4">
        <div className="col-12 col-md-6 col-lg-4">
          <Link className="text-decoration-none" to={"atendimento"}>
            <div
              className="card border-0 shadow-sm h-100 card-hover"
              style={{ borderRadius: "12px", transition: "all 0.3s ease" }}
            >
              <div className="card-body text-center p-4">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                  }}
                >
                  <i
                    className="bi bi-person-vcard text-white"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
                <h5 className="fw-semibold mb-2" style={{ color: "#1e3a8a" }}>
                  Atendimento
                </h5>
                <p className="text-muted small mb-0">
                  Registre e gerencie atendimentos
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <Link className="text-decoration-none" to={"#"}>
            <div
              className="card border-0 shadow-sm h-100 card-hover"
              style={{ borderRadius: "12px", transition: "all 0.3s ease" }}
            >
              <div className="card-body text-center p-4">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                  }}
                >
                  <i
                    className="bi bi-display text-white"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
                <h5 className="fw-semibold mb-2" style={{ color: "#1e3a8a" }}>
                  Acompanhamento
                </h5>
                <p className="text-muted small mb-0">
                  Monitore o status dos atendimentos
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <Link className="text-decoration-none" to={"fichas"}>
            <div
              className="card border-0 shadow-sm h-100 card-hover"
              style={{ borderRadius: "12px", transition: "all 0.3s ease" }}
            >
              <div className="card-body text-center p-4">
                <div
                  className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    background:
                      "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                  }}
                >
                  <i
                    className="bi bi-receipt text-white"
                    style={{ fontSize: "2rem" }}
                  ></i>
                </div>
                <h5 className="fw-semibold mb-2" style={{ color: "#1e3a8a" }}>
                  Fichas
                </h5>
                <p className="text-muted small mb-0">
                  Visualize e gerencie fichas
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style>{`
        .card-hover {
          cursor: pointer;
        }
        
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(30, 58, 138, 0.15) !important;
        }

        .card-hover:active {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}
