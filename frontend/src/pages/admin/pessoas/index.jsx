import { useState } from "react";
import ListarUsuarios from "./listarUsuarios";
import CadastrarFuncionario from "./cadastrarUsuario";

export default function Pessoas() {
  const [abaAtiva, setAbaAtiva] = useState("listar");

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="mb-4">
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
              className="bi bi-person-gear text-white"
              style={{ fontSize: "1.75rem" }}
            ></i>
          </div>
          <div>
            <h2 className="fw-bold mb-1" style={{ color: "#1e3a8a" }}>
              Usuários
            </h2>
            <p className="text-muted mb-0">
              Neste módulo, você poderá gerenciar usuários, como: criar,
              excluir, atualizar.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs modernizadas */}
      <div className="mb-4">
        <div
          className="d-flex gap-2 border-bottom"
          style={{ borderColor: "#e2e8f0" }}
        >
          <button
            className={`btn border-0 px-4 py-3 position-relative ${
              abaAtiva === "listar" ? "tab-active" : "tab-inactive"
            }`}
            onClick={() => setAbaAtiva("listar")}
            style={{
              background: "transparent",
              color: abaAtiva === "listar" ? "#1e3a8a" : "#64748b",
              fontWeight: abaAtiva === "listar" ? "600" : "500",
              borderRadius: "0",
              transition: "all 0.2s ease",
            }}
          >
            <i className="bi bi-list-ul me-2"></i>
            Listar
            {abaAtiva === "listar" && (
              <div
                className="position-absolute bottom-0 start-0 w-100"
                style={{
                  height: "3px",
                  background: "#1e3a8a",
                  borderRadius: "3px 3px 0 0",
                }}
              ></div>
            )}
          </button>

          <button
            className={`btn border-0 px-4 py-3 position-relative ${
              abaAtiva === "cadastrar" ? "tab-active" : "tab-inactive"
            }`}
            onClick={() => setAbaAtiva("cadastrar")}
            style={{
              background: "transparent",
              color: abaAtiva === "cadastrar" ? "#1e3a8a" : "#64748b",
              fontWeight: abaAtiva === "cadastrar" ? "600" : "500",
              borderRadius: "0",
              transition: "all 0.2s ease",
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Cadastrar
            {abaAtiva === "cadastrar" && (
              <div
                className="position-absolute bottom-0 start-0 w-100"
                style={{
                  height: "3px",
                  background: "#1e3a8a",
                  borderRadius: "3px 3px 0 0",
                }}
              ></div>
            )}
          </button>
        </div>
      </div>

      <div>
        {abaAtiva === "listar" && <ListarUsuarios />}
        {abaAtiva === "cadastrar" && <CadastrarFuncionario />}
      </div>

      <style>{`
        .tab-inactive:hover {
          color: #1e3a8a !important;
          background: #f8fafc !important;
        }
      `}</style>
    </div>
  );
}
