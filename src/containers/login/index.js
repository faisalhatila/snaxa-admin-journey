import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { AuthContext } from "./../../shared/context/index";
import useForm from "./useForm";
import validate from "./validate";

const LoginContainer = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isRememberedChecked, setIsRememberedChecked] = useState();
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    handleSubmit();
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          email: values.email,
          password: values.password,
        })
      );
      auth.login(responseData.userId, responseData.token);
      history.go("/");
    } catch (err) {
      console.log(error);
    }
  };
  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate
  );
  function submit() {
    console.log("success");
  }
  const handleCheck = (e) => {
    console.log(e.target.checked);
    setIsRememberedChecked(e.target.checked);
  };
  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(assets/img/loginScreen/Rectangle290.png)",
      }}
      className="loginPageMainDiv"
    >
      <div className="container">
        <div className="loginScreenRow1">
          <h2>
            <strong>Snaxa</strong>
          </h2>
          <p>Admin Login Panel</p>
          <div className="loginPageFormDiv col-12 col-lg-4 col-md-6 offset-lg-4 offset-md-3 mt-3">
            <p>Login To Your Account</p>
            <form className="mt-2">
              <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                {errors.emailError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {errors.emailError}
                  </div>
                ) : null}
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                {errors.passwordError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {errors.passwordError}
                  </div>
                ) : null}
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                  onChange={handleCheck}
                />
                <label class="form-check-label" for="exampleCheck1">
                  Keep Me Looged In
                </label>
              </div>
              <button
                type="submit"
                onClick={handleLoginSubmit}
                class="btn btn-primary loginButton mt-2"
              >
                Submit
              </button>
              {/* <p className="createAccountText pt-2 pb-2">
                  Dont have an account?
                  <span className="createAccountLabel">Create an account</span>
                </p> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
