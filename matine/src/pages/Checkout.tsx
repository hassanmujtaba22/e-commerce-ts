import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../redux/action/create_order";
import { clear_cart } from "../redux/reducers/cartRedux";

function Checkout() {
  const user = useSelector((state: any) => state.user.currentUser);
  const cart = useSelector((state: any) => state.cart);
  const [addData, setAddData]: any = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    city: "",
    postalCode: "",
    address: "",
  });
  const [stripeToken, setStripeToken] = useState(null);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [_package, setPackage]: any = useState({});
  const dispatch = useDispatch();
  const handleCreateOrder = (e: any) => {
    e.preventDefault();
    let cartData: any = {};
    cartData.products = cart.products.map((x: any) => ({
      productId: x._id,
      vendor: x.vendor,
      title: x.title,
      profitMargin: x.profitMargin,
      productCode: x.productCode,
      price: x.price,
      vendorPrice: x.vendorPrice,
      qty: x.quantity,
      stockCountPending: x.stockCountPending,
      stockCountConsumed: x.stockCountConsumed,
      totalSale: x.totalSale,
    }));
    if (cart.code) {
      cartData.applied_Referral_Code = cart.code;
    }
    if (user) {
      cartData.user = user._id;
    }
    cartData.name = addData.fname + " " + addData.lname;
    cartData.email = addData.email;
    cartData.address = addData.address;
    cartData.city = addData.city;
    cartData.postalCode = addData.postalCode;
    cartData.phone = addData.phone;
    createOrder(cartData)
      .then((res: any) => {
        if (res.status === 200) {
          alert(res.data.message);
          dispatch(clear_cart());
          setAddData({fname: "",
          lname: "",
          email: "",
          phone: "",
          city: "",
          postalCode: "",
          address: "",
        });
          navigate("/");
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => alert(error));
  };
  const calculateDiscount = (): number => {
    let total = Number(cart.total);
    let vendorTotal = Number(cart.vendorTotal);
    let profit = total - vendorTotal;
    let discount_percentage = Number(_package?.discount_percentage | 0);
    let netAmount = (profit * discount_percentage) / 100;
    return netAmount;
  };
  return (
    <div className="page-content">
      <div className="checkout">
        <div className="container">
          <form action="#">
            <div className="row">
              <div className="col-lg-9">
                <h2 className="checkout-title">Billing Details</h2>
                {/* End .checkout-title */}
                <div className="row">
                  <div className="col-sm-6">
                    <label>First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={addData.fname}
                      onChange={(e) =>
                        setAddData((prev: any) => ({
                          ...prev,
                          fname: e.target.value,
                        }))
                      }
                    />
                  </div>
                  {/* End .col-sm-6 */}
                  <div className="col-sm-6">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={addData.lname}
                      onChange={(e) =>
                        setAddData((prev: any) => ({
                          ...prev,
                          lname: e.target.value,
                        }))
                      }
                    />
                  </div>
                  {/* End .col-sm-6 */}
                </div>
                {/* End .row */}
                <label>Email address *</label>
                <input
                  type="email"
                  className="form-control"
                  required
                  value={addData.email}
                  onChange={(e) =>
                    setAddData((prev: any) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
                <label>Phone *</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={addData.phone}
                  onChange={(e) =>
                    setAddData((prev: any) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                />
                <div className="row">
                  <div className="col-sm-6">
                    <label>City *</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={addData.city}
                      onChange={(e) =>
                        setAddData((prev: any) => ({
                          ...prev,
                          city: e.target.value,
                        }))
                      }
                    />
                  </div>
                  {/* End .col-sm-6 */}
                  <div className="col-sm-6">
                    <label>Postcode / Zip</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      value={addData.postalCode}
                      onChange={(e) =>
                        setAddData((prev: any) => ({
                          ...prev,
                          postalCode: e.target.value,
                        }))
                      }
                    />
                  </div>
                  {/* End .col-sm-6 */}
                </div>
                {/* End .row */}

                <label>Street address *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="House number and Street name"
                  required
                  value={addData.address}
                  onChange={(e) =>
                    setAddData((prev: any) => ({
                      ...prev,
                      address: e.target.value,
                    }))
                  }
                />
              </div>
              {/* End .col-lg-9 */}
              <aside className="col-lg-3">
                <div className="summary">
                  <h3 className="summary-title">Your Order</h3>
                  {/* End .summary-title */}
                  <table className="table table-summary">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.products.map((item: any) => (
                        <tr key={item._id}>
                          <td>
                            <Link to={`/product/${item._id}`}>{item.title}</Link>
                          </td>
                          <td>Rs.{item.quantity * item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td className="p-0">
                          <b>Total Amount</b>
                        </td>
                        <td className="text-right py-2">
                          Rs.{cart.total}
                        </td>
                      </tr>
                      <tr>
                      <td className="p-0">
                          <b>Discount</b>
                        </td>
                        <td className="text-right py-2">
                          Rs.{calculateDiscount()}
                        </td>
                      </tr>
                      <tr>
                      <td className="p-0">
                          <b>Net Amount</b>
                        </td>
                        <td className="text-right py-2">
                          Rs.{cart.total - calculateDiscount()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <button
                    type="submit"
                    onClick={handleCreateOrder}
                    className="btn btn-outline-primary-2 btn-order btn-block"
                  >
                    <span className="btn-text">Place Order</span>
                    <span className="btn-hover-text">Proceed to Checkout</span>
                  </button>
                </div>
                {/* End .summary */}
              </aside>
              {/* End .col-lg-3 */}
            </div>
            {/* End .row */}
          </form>
        </div>
        {/* End .container */}
      </div>
      {/* End .checkout */}
    </div>
  );
}

export default Checkout;
