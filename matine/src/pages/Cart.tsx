import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { apply_discount_code } from '../redux/action/discount_code';
import { addProduct, addProductToCart, clearProductFromCart, clear_cart } from '../redux/reducers/cartRedux';

function Cart() {
  const user = useSelector((state: any) => state.user.currentUser);
  const cart = useSelector((state: any) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const [code, setCode] = useState("");
  const [_package, setPackage]: any = useState({});
  const dispatch = useDispatch();
  const calculateDiscount = (): number => {
    let total = Number(cart.total)
    let vendorTotal = Number(cart.vendorTotal)
    let profit = total-vendorTotal
    let discount_percentage = Number(_package?.discount_percentage | 0)
    let netAmount = profit*discount_percentage/100
    return netAmount
  }
  return (
    <div className="page-content">
      <div className="cart">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <table className="table table-cart table-mobile">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cart.products.length > 0 ?
                    cart.products.map((item: any) => (
                      <tr key={item._id}>
                        <td className="product-col">
                          <div className="product">
                            <figure className="product-media">
                              <Link to={`/product/${item._id}`}>
                                <img
                                  src={item.imageURL}
                                  alt="Product image"
                                />
                              </Link>
                            </figure>
                            <h3 className="product-title">
                              <Link to={`/product/${item._id}`}>
                                {item.title}
                              </Link>
                            </h3>{/* End .product-title */}
                          </div>{/* End .product */}
                        </td>
                        <td className="price-col">Rs.{item.price}</td>
                        <td className="quantity-col">
                          <div className="cart-product-quantity">
                            <input type="number" id="qty" className="form-control" defaultValue={1} min={1} step={1} data-decimals={0} required
                              value={item.quantity}
                              onChange={(e: any) => {
                                dispatch(addProductToCart({ ...item, quantity: e.target.value }))
                              }} />
                          </div>{/* End .cart-product-quantity */}
                        </td>
                        <td className="total-col">Rs.{item.quantity * item.price}</td>
                        <td className="remove-col"><button className="btn-remove" onClick={() => dispatch(clearProductFromCart(item))}><i className="icon-close" /></button></td>
                      </tr>
                    ))

                    : null}
                </tbody>
              </table>{/* End .table table-wishlist */}
              <div className="cart-bottom">
                <div className="cart-discount">
                  <div>
                    <div className="input-group">
                      <input type="text" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} required placeholder="coupon code" />
                      <div className="input-group-append">
                        <button className="btn btn-outline-primary-2" onClick={() =>
                          apply_discount_code(dispatch, code).then((res: any) =>
                            setPackage(res)
                          )
                        }><i className="icon-long-arrow-right" /></button>
                      </div>{/* .End .input-group-append */}
                    </div>{/* End .input-group */}
                  </div>
                </div>{/* End .cart-discount */}
                <button className="btn btn-outline-dark-2" onClick={()=> dispatch(clear_cart())}><span>CLEAR CART</span><i className="icon-refresh" /></button>
              </div>{/* End .cart-bottom */}
            </div>{/* End .col-lg-9 */}
            <aside className="col-lg-3">
              <div className="summary summary-cart">
                <h3 className="summary-title">Cart Total</h3>{/* End .summary-title */}
                <table className="table table-summary">
                  <tbody>
                    <tr className="summary-subtotal">
                      <td>Subtotal:</td>
                      <td>Rs.{cart.total}</td>
                    </tr>
                    <tr className="summary-subtotal">
                      <td>Discount:</td>
                      <td>Rs.{calculateDiscount()}</td>
                    </tr>
                    <tr className="summary-total">
                    <td>Total:</td>
                      <td>Rs.{cart.total-calculateDiscount()}</td>
                    </tr>{/* End .summary-total */}
                  </tbody>
                </table>{/* End .table table-summary */}
                <Link to="/checkout" className="btn btn-outline-primary-2 btn-order btn-block">PROCEED TO CHECKOUT</Link>
              </div>{/* End .summary */}
              <Link to="/" className="btn btn-outline-dark-2 btn-block mb-3"><span>CONTINUE SHOPPING</span><i className="icon-refresh" /></Link>
            </aside>{/* End .col-lg-3 */}
          </div>{/* End .row */}
        </div>{/* End .container */}
      </div>{/* End .cart */}
    </div>
  )
}

export default Cart