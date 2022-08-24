import { loginFailure, loginStart, loginSuccess } from "../reducers/userRedux";
import { publicRequest } from "../../requestMethods";

export const login = async (dispatch: any, user: any) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth", user);
    dispatch(loginSuccess(res.data.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
export const register = async (dispatch: any, user: any) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/register", user);
    dispatch(loginSuccess(res.data.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
