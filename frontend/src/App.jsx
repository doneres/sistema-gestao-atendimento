import Footer from "./components/footer";
import NavBar from "./components/navBar";
import "./style.css";

import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <NavBar />

      <Outlet />
      <Footer />
    </>
  );
}
