import React from 'react'

function Footer() {
  return (
    <footer className="footer footer-2">
      <div className="container">
        <hr className="mb-7" />
        <div className="row">
          <div className="col-2xl-5col col-md-12">
            <div className="widget widget-about">
              <img src="assets/images/demos/demo-21/logo-footer.png" className="footer-logo" alt="Footer Logo" width={100} height={25} />
              <p>Praesent dapibus, neque id cursus ucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. </p>
              <div className="widget-about-info">
                <div className="row">
                  <div className="col-sm-6 col-md-4 phoneNum">
                    <span className="widget-about-title">Got Question? Call us 24/7</span>
                    <a href="tel:123456789">+0123 456 789</a>
                  </div>{/* End .col-sm-6 */}
                  <div className="col-sm-6 col-md-8 payment">
                    <span className="widget-about-title">Payment Method</span>
                    <figure className="footer-payments">
                      <img src="assets/images/payments.png" alt="Payment methods" width={272} height={20} />
                    </figure>{/* End .footer-payments */}
                  </div>{/* End .col-sm-6 */}
                </div>{/* End .row */}
              </div>{/* End .widget-about-info */}
            </div>{/* End .widget about-widget */}
          </div>{/* End .col-sm-12 col-lg-3 */}
          <div className="col-xl-5col col-sm-4 col-md-4">
            <div className="widget">
              <h4 className="widget-title">Information</h4>{/* End .widget-title */}
              <ul className="widget-list">
                <li><a href="about.html">About Molla</a></li>
                <li><a href="#">How to shop on Molla</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="contact.html">Contact us</a></li>
                <li><a href="login.html">Log in</a></li>
              </ul>{/* End .widget-list */}
            </div>{/* End .widget */}
          </div>{/* End .col-sm-4 col-lg-3 */}
          <div className="col-xl-5col col-sm-4 col-md-6=4">
            <div className="widget">
              <h4 className="widget-title">Customer Service</h4>{/* End .widget-title */}
              <ul className="widget-list">
                <li><a href="#">Payment Methods</a></li>
                <li><a href="#">Money-back guarantee!</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Shipping</a></li>
                <li><a href="#">Terms and conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>{/* End .widget-list */}
            </div>{/* End .widget */}
          </div>{/* End .col-sm-4 col-lg-3 */}
          <div className="col-xl-5col col-sm-4 col-md-4">
            <div className="widget">
              <h4 className="widget-title">My Account</h4>{/* End .widget-title */}
              <ul className="widget-list">
                <li><a href="#">Sign In</a></li>
                <li><a href="cart.html">View Cart</a></li>
                <li><a href="#">My Wishlist</a></li>
                <li><a href="#">Track My Order</a></li>
                <li><a href="#">Help</a></li>
              </ul>{/* End .widget-list */}
            </div>{/* End .widget */}
          </div>{/* End .col-sm-64 col-lg-3 */}
        </div>{/* End .row */}
      </div>{/* End .container */}
      <div className="footer-bottom">
        <div className="container">
          <p className="footer-copyright">Copyright © 2019 Molla Store. All Rights Reserved.</p>{/* End .footer-copyright */}
          <ul className="footer-menu">
            <li><a href="#">Terms Of Use</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>{/* End .footer-menu */}
          <div className="social-icons social-icons-color">
            <span className="social-label">Social Media</span>
            <a href="#" className="social-icon social-facebook" title="Facebook" target="_blank"><i className="icon-facebook-f" /></a>
            <a href="#" className="social-icon social-twitter" title="Twitter" target="_blank"><i className="icon-twitter" /></a>
            <a href="#" className="social-icon social-instagram" title="Instagram" target="_blank"><i className="icon-instagram" /></a>
            <a href="#" className="social-icon social-youtube" title="Youtube" target="_blank"><i className="icon-youtube" /></a>
            <a href="#" className="social-icon social-pinterest" title="Pinterest" target="_blank"><i className="icon-pinterest" /></a>
          </div>{/* End .soial-icons */}
        </div>{/* End .container */}
      </div>{/* End .footer-bottom */}
    </footer>
  )
}

export default Footer