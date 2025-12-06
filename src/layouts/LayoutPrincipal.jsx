// src/layouts/LayoutPrincipal.jsx
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function LayoutPrincipal() {
  const backgroundTemplate = "/Template Verde espelhado Listas brancas verticais 300 DPI.png";
  const logo = "/logo-site-fundo-transparene.png";
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col text-white relative bg-[#010b0a] overflow-x-hidden">
      <ScrollToTop />

      <header
        className="relative w-full z-40 flex flex-col items-center justify-center pt-8 pb-6"
        style={{
          backgroundImage: `url("${backgroundTemplate}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          boxShadow: "0 6px 25px rgba(28, 75, 28, 0.7)",
        }}
      >
        <img
          src={logo}
          alt="Penso Logo Creio"
          className="mx-auto drop-shadow-[0_0_35px_rgba(212,175,55,0.7)] animate-fadeIn"
          style={{
            objectFit: "contain",
            maxHeight: "200px",
            maxWidth: "90%",
          }}
        />

        <div className="w-full mt-2">
          <NavBar />
        </div>
      </header>

      <main
        className="flex-grow relative z-10"
        style={{
          marginTop: isHome ? "40px" : "60px",
          paddingBottom: "120px",
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
