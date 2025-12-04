import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import CategoriaAtendimento from "./pages/admin/categoriaAtendimento/";
import Home from "./pages/home/";
import Pessoas from "./pages/admin/pessoas/";
import Atendimento from "./pages/atendimento/";
import GerenciarFichas from "./pages/fichas/";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "usuarios",
        element: <Pessoas />,
      },
      {
        path: "categorias-atendimento",
        element: <CategoriaAtendimento />,
      },
      {
        path: "atendimento",
        element: <Atendimento />,
      },
      {
        path: "fichas",
        element: <GerenciarFichas />,
      },
    ],
  },
]);

const root = document.getElementById("root");
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minuto
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
