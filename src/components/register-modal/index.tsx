import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../../redux/action/auth_api";

function RegisterModal() {
  const [loginData, setLoginData]: any = useState({ email: "", password: "" });
  const [registerData, setRegisterData]: any = useState({});
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state: any) => state.user);
  const { isFetching: regiterIsFetching, error: regiterError } = useSelector(
    (state: any) => state.user
  );
  const handleClick = (e: any) => {
    e.preventDefault();
    login(dispatch, { email: loginData.email, password: loginData.password });
  };
  const handleRegClick = (e: any) => {
    e.preventDefault();
    if (registerData.password !== registerData.cpassword) {
      alert("Password and confirm password must be match");
      return;
    }
    registerData.role = "Customer";
    register(dispatch, registerData);
  };
  return (
    <div
      className="modal fade"
      id="signin-modal"
      tabIndex={-1}
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">
                <i className="icon-close" />
              </span>
            </button>
            <div className="form-box">
              <div className="form-tab">
                <ul className="nav nav-pills nav-fill" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="signin-tab"
                      data-toggle="tab"
                      href="#signin"
                      role="tab"
                      aria-controls="signin"
                      aria-selected="true"
                    >
                      Sign In
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      id="register-tab"
                      data-toggle="tab"
                      href="#register"
                      role="tab"
                      aria-controls="register"
                      aria-selected="false"
                    >
                      Register
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="tab-content-5">
                  <div
                    className="tab-pane fade show active"
                    id="signin"
                    role="tabpanel"
                    aria-labelledby="signin-tab"
                  >
                    <form>
                      <div className="form-group">
                        <label htmlFor="singin-email">
                          Username or email address *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="singin-email"
                          required
                          onChange={(e) =>
                            setLoginData((prev: any) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                      {/* End .form-group */}
                      <div className="form-group">
                        <label htmlFor="singin-password">Password *</label>
                        <input
                          type="password"
                          className="form-control"
                          id="singin-password"
                          required
                          onChange={(e) =>
                            setLoginData((prev: any) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                        />
                      </div>
                      {/* End .form-group */}
                      <div className="form-footer">
                        <button
                          type="submit"
                          className="btn btn-outline-primary-2"
                          onClick={handleClick}
                          disabled={isFetching}
                        >
                          <span>LOG IN</span>
                          <i className="icon-long-arrow-right" />
                        </button>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="signin-remember"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="signin-remember"
                          >
                            Remember Me
                          </label>
                        </div>
                        {/* End .custom-checkbox */}
                        <a href="#" className="forgot-link">
                          Forgot Your Password?
                        </a>
                      </div>
                      {/* End .form-footer */}
                    </form>
                    {/* End .form-choice */}
                  </div>
                  {/* .End .tab-pane */}
                  <div
                    className="tab-pane fade"
                    id="register"
                    role="tabpanel"
                    aria-labelledby="register-tab"
                  >
                    <form action="#">
                      <div className="form-group">
                        <label htmlFor="first_name">First Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="first_name"
                          required
                          onChange={(e) =>
                            setRegisterData((prev: any) => ({
                              ...prev,
                              firstname: e.target.value,
                            }))
                          }
                        />
                      </div>
                      {/* End .form-group */}
                      <div className="form-group">
                        <label htmlFor="last_name">last Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          id="last_name"
                          required
                          onChange={(e) =>
                            setRegisterData((prev: any) => ({
                              ...prev,
                              lastname: e.target.value,
                            }))
                          }
                        />
                      </div>
                      {/* End .form-group */}
                      <div className="form-group">
                        <label htmlFor="register-email">
                          Your email address *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="register-email"
                          required
                          onChange={(e) =>
                            setRegisterData((prev: any) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="register-password">Password *</label>
                        <input
                          type="password"
                          className="form-control"
                          id="register-password"
                          required
                          onChange={(e) =>
                            setRegisterData((prev: any) => ({
                              ...prev,
                              password: e.target.value,
                            }))
                          }
                        />
                      </div>
                      {/* End .form-group */}
                      <div className="form-group">
                        <label htmlFor="confirm-password">
                          Confirm Password *
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="confirm-password"
                          required
                          onChange={(e) =>
                            setRegisterData((prev: any) => ({
                              ...prev,
                              cpassword: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="form-footer">
                        <button
                          type="submit"
                          className="btn btn-outline-primary-2"
                          onClick={handleRegClick}
                          disabled={regiterIsFetching}
                        >
                          <span>SIGN UP</span>
                          <i className="icon-long-arrow-right" />
                        </button>
                        <div className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="register-policy"
                            required
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="register-policy"
                          >
                            I agree to the <a href="#">privacy policy</a> *
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterModal;
