import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import RegisterModal from "./register-modal";

function Layout() {
  return (
    <>
      <div className="page-wrapper">
        <Header />
        <main className="main"> <Outlet /></main>
        <Footer />
        <button id="scroll-top" title="Back to Top">
          <i className="icon-arrow-up" />
        </button>
        <div className="mobile-menu-overlay" />
      </div>
      <RegisterModal />
    </>
  );
}

export default Layout;
