import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { FooterLinks } from "./Footer";
import { HeaderResponsive } from "./Header";

function Layout() {
  const { categories, isFetching } = useSelector(
    (state: any) => state.category
  );
  const [footerCategories, setFooterCategories] = useState([])
  useEffect(() => {
   let cats = categories.map((category: any) => ({label: category.title, link: `/products/${category._id}`}))
   setFooterCategories(cats)
  }, [])
  
  return (
    <>
      <HeaderResponsive
        links={[
          { label: "Home", link: "/" },
          { label: "Products", link: "/products" },
          { label: "Packages", link: "/packages" },
          { label: "About us", link: "/about" },
        ]}
      />
      <Outlet />
      <FooterLinks
        data={[
          {
            title: "Category",
            links: [
              ...footerCategories
            ],
          },
          {
            title: "Pages",
            links: [
              { label: "Home", link: "/" },
              { label: "Products", link: "/products" },
              { label: "Packages", link: "/packages" },
              { label: "About us", link: "/about" },
            ],
          },
        ]}
      />
    </>
  );
}

export default Layout;
