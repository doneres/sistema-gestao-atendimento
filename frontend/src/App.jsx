import Footer from "./components/footer";
import NavBar from "./components/navBar";
import "./style.css";

import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#1e293b",
            color: "#f8fafc",
          },
        }}
      />
    </>
  );
}
