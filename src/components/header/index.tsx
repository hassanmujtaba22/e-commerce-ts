import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/darsi-logo.png";
function Header() {
  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container py-3">
            <div className="header-left"></div>
            <div className="header-right">
              <ul className="top-menu">
                <li>
                  <a href="#">Links</a>
                  <ul>
                    <li>
                      <a href="tel:#">
                        <i className="icon-phone" />
                        Call: +0123 456 789
                      </a>
                    </li>
                    <li>
                      <a href="about.html">About Us</a>
                    </li>
                    <li>
                      <a href="contact.html">Contact Us</a>
                    </li>
                    <li>
                      <a href="#signin-modal" data-toggle="modal">
                        <i className="icon-user" />
                        Login
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="header-middle sticky-header">
          <div className="container">
            <div className="header-left">
              <button className="mobile-menu-toggler">
                <span className="sr-only">Toggle mobile menu</span>
                <i className="icon-bars" />
              </button>
              <Link to="/" className="logo m-0">
                <img
                  src={logo}
                  alt="Logo"
                  style={{
                    width: "100px",
                    height: "100px",
                    // objectFit: "contained",
                    margin: 0,
                  }}
                />
              </Link>
              <nav className="main-nav">
                <ul className="menu">
                  <li className="megamenu-container active">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="megamenu-container">
                    <Link to="/products">Products</Link>
                  </li>
                  <li className="megamenu-container">
                    <Link to="/packages">Packages</Link>
                  </li>
                </ul>
                {/* End .menu */}
              </nav>
              {/* End .main-nav */}
            </div>
            {/* End .header-left */}
            <div className="header-right">
              <div className="header-search">
                <a
                  href="#"
                  className="search-toggle"
                  role="button"
                  title="Search"
                >
                  <i className="icon-search" />
                </a>
                <form action="#" method="get">
                  <div className="header-search-wrapper">
                    <label htmlFor="q" className="sr-only">
                      Search
                    </label>
                    <input
                      type="search"
                      className="form-control"
                      name="q"
                      id="q"
                      placeholder="Search in..."
                      required
                    />
                  </div>
                  {/* End .header-search-wrapper */}
                </form>
              </div>
              {/* End .header-search */}
              <div className="dropdown cart-dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-display="static"
                >
                  <i className="icon-shopping-cart" />
                  <span className="cart-count">2</span>
                </a>
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-cart-products">
                    <div className="product">
                      <div className="product-cart-details">
                        <h4 className="product-title">
                          <a href="product.html">
                            Beige knitted elastic runner shoes
                          </a>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span>x $84.00
                        </span>
                      </div>
                      {/* End .product-cart-details */}
                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img
                            src="assets/images/products/cart/product-1.jpg"
                            alt="product"
                          />
                        </a>
                      </figure>
                      <a href="#" className="btn-remove" title="Remove Product">
                        <i className="icon-close" />
                      </a>
                    </div>
                    {/* End .product */}
                    <div className="product">
                      <div className="product-cart-details">
                        <h4 className="product-title">
                          <a href="product.html">
                            Blue utility pinafore denim dress
                          </a>
                        </h4>
                        <span className="cart-product-info">
                          <span className="cart-product-qty">1</span>x $76.00
                        </span>
                      </div>
                      {/* End .product-cart-details */}
                      <figure className="product-image-container">
                        <a href="product.html" className="product-image">
                          <img
                            src="assets/images/products/cart/product-2.jpg"
                            alt="product"
                          />
                        </a>
                      </figure>
                      <a href="#" className="btn-remove" title="Remove Product">
                        <i className="icon-close" />
                      </a>
                    </div>
                    {/* End .product */}
                  </div>
                  {/* End .cart-product */}
                  <div className="dropdown-cart-total">
                    <span>Total</span>
                    <span className="cart-total-price">$160.00</span>
                  </div>
                  {/* End .dropdown-cart-total */}
                  <div className="dropdown-cart-action">
                    <a href="cart.html" className="btn btn-primary">
                      View Cart
                    </a>
                    <a
                      href="checkout.html"
                      className="btn btn-outline-primary-2"
                    >
                      <span>Checkout</span>
                      <i className="icon-long-arrow-right" />
                    </a>
                  </div>
                  {/* End .dropdown-cart-total */}
                </div>
                {/* End .dropdown-menu */}
              </div>
              {/* End .cart-dropdown */}
            </div>
            {/* End .header-right */}
          </div>
          {/* End .container */}
        </div>
        {/* End .header-middle */}
      </header>

      <div className="mobile-menu-container mobile-menu-light">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close">
            <i className="icon-close" />
          </span>
          <form action="#" method="get" className="mobile-search">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="mobile-search"
              id="mobile-search"
              placeholder="Search in..."
              required
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form>
          <nav className="mobile-nav">
            <ul className="mobile-menu">
              <li className="active">
                <Link to="/">Home</Link>
              </li>
              <li className="active">
                <Link to="/products">Products</Link>
              </li>
              <li className="active">
                <Link to="/packages">Packages</Link>
              </li>
            </ul>
          </nav>
          {/* End .mobile-nav */}
          <div className="social-icons">
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Facebook"
            >
              <i className="icon-facebook-f" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Twitter">
              <i className="icon-twitter" />
            </a>
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Instagram"
            >
              <i className="icon-instagram" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Youtube">
              <i className="icon-youtube" />
            </a>
          </div>
          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
    </>
  );
}

export default Header;
