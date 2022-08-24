import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FooterLinks } from "./Footer";
import { HeaderResponsive } from "./Header";

function Layout() {
  return (
    <>
      <HeaderResponsive
        links={[
          { label: "Home", link: "/" },
          { label: "About us", link: "/about" },
        ]}
      />
      <Outlet />
      <FooterLinks
        data={[
          {
            title: "Home",
            links: [
              { label: "Home", link: "/" },
              { label: "About us", link: "/about" },
            ],
          },
        ]}
      />
    </>
  );
}

export default Layout;
