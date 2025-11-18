import { Link } from "react-router";

export default function NavBar() {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
        style={{ padding: "0.75rem 0" }}
      >
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center" to={"/"}>
            <div className="d-flex align-items-center gap-2">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{
                  width: "36px",
                  height: "36px",
                  background: "#1e3a8a",
                }}
              >
                <span
                  className="text-white fw-bold"
                  style={{ fontSize: "0.9rem" }}
                >
                  SGA
                </span>
              </div>
            </div>
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-1">
              <li className="nav-item">
                <Link
                  className="nav-link fw-medium px-3 py-2 rounded-2 nav-item-hover"
                  aria-current="page"
                  to={"/"}
                  style={{ color: "#334155" }}
                >
                  <i className="bi bi-house-door me-1"></i>
                  Home
                </Link>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-medium px-3 py-2 rounded-2 nav-item-hover"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "#334155" }}
                >
                  <i className="bi bi-clipboard-data me-1"></i>
                  Relatórios
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end border-0 shadow-sm mt-2 py-2"
                  style={{ minWidth: "200px", borderRadius: "8px" }}
                >
                  <li>
                    <a
                      className="dropdown-item py-2 px-3 dropdown-item-hover"
                      href="#"
                      style={{ color: "#334155" }}
                    >
                      <i
                        className="bi bi-person-exclamation me-2"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Usuários
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item py-2 px-3 dropdown-item-hover"
                      href="#"
                      style={{ color: "#334155" }}
                    >
                      <i
                        className="bi bi-ticket me-2"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Fichas
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle fw-medium px-3 py-2 rounded-2 nav-item-hover"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ color: "#334155" }}
                >
                  <i className="bi bi-gear me-1"></i>
                  Admin
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end border-0 shadow-sm mt-2 py-2"
                  style={{ minWidth: "230px", borderRadius: "8px" }}
                >
                  <li>
                    <Link
                      className="dropdown-item py-2 px-3 dropdown-item-hover"
                      to={"/usuarios"}
                      style={{ color: "#334155" }}
                    >
                      <i
                        className="bi bi-person-gear me-2"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Usuários
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item py-2 px-3 dropdown-item-hover"
                      to={"/categorias-atendimento"}
                      style={{ color: "#334155" }}
                    >
                      <i
                        className="bi bi-tags me-2"
                        style={{ color: "#1e3a8a" }}
                      ></i>
                      Categorias Atendimento
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <style>{`
        .nav-item-hover:hover {
          background-color: #f1f5f9;
          color: #1e3a8a !important;
          transition: all 0.2s ease;
        }
        
        .dropdown-item-hover {
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        
        .dropdown-item-hover:hover {
          background-color: #f1f5f9;
          color: #1e3a8a !important;
        }
        
        .dropdown-menu {
          animation: fadeIn 0.2s ease;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar {
          border-bottom: 1px solid #e2e8f0;
        }
      `}</style>
    </>
  );
}
