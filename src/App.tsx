import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
