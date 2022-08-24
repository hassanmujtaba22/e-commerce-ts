import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { Banner } from "./components/Banner";
import { FooterLinks } from "./components/Footer";
import { HeaderResponsive } from "./components/Header";
import { HomeCategory } from "./components/HomeCategory";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import "./App.css"
export default function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {/* <Route path="cart" element={<Cart />} />
            <Route path="products" element={<Products />} />
            <Route path="packages" element={<Packages />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="product/:_id" element={<ProductDetail />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
       
        
        
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
