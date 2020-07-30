// import React, { useState, useContext } from "react";
// import { useHistory, NavLink, useParams } from "react-router-dom";
import React, { useEffect } from "react";
import { useHttpClient } from "./../../shared/hooks/http-hook";
// import { useContext } from "react";
// import { AuthContext } from "./../../shared/context/index";
// import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./custom.css";
// import "./style.css";
import backImg from "./Rectangle290.png";
const ChangePassword = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [linkExpired, setLinkExpired] = useState(false);
  // const [loginCredentials, setLoginCredentials] = useState("");
  // const [isRememberedChecked, setIsRememberedChecked] = useState("");
  const [formStep, setFormStep] = useState(1);
  const handleEmailChange = (event) => {
    setEmailError("");
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordError("");
    setPassword(event.target.value);
  };
  const history = useHistory();
  const token = useParams().token;
  useEffect(() => {
    if (token) setFormStep(2);
  }, [token]);

  const handleCloseAlert = () => {
    if (error) {
      setErrorAlert(false);
      clearError();
    }
  };

  useEffect(() => {
    const dashboard = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/check-token/${token}`,
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            token,
          })
        );
      } catch (err) {
        setErrorAlert(true);
        setLinkExpired(true);
      }
    };
    if (formStep === 2) dashboard();
  }, [formStep, sendRequest]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging");
    if (formStep === 1)
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/reset`,
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            email,
          })
        );
        console.log(responseData)
        setSubmitted(true);
      } catch (err) {
        setErrorAlert(true);
      }
    else if (formStep === 2)
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/reset/${token}`,
          "POST",
          {
            "Content-Type": "application/json",
          },
          JSON.stringify({
            password,
          })
        );
        history.push("/");
        history.go("/");
      } catch (err) {
        setErrorAlert(true);
      }
  };
  // const validate = () => {
  //   // if (!email || !email.includes("@")) {
  //   // 	emailErrorText = "Please Enter Proper Email Address";
  //   // } else {
  //   // 	emailErrorText = "";
  //   // }
  //   // if (!password) {
  //   // 	passwordErrorText = "Please Enter A Valid Password";
  //   // } else {
  //   // 	passwordErrorText = "";
  //   // }
  //   // if (emailError || passwordError) {
  //   // 	setEmailError(emailErrorText);
  //   // 	setPasswordError(passwordErrorText);
  //   // 	return false;
  //   // }
  //   return true;
  // };
  // const handleCheck = (e) => {
  //   console.log(e.target.checked);
  //   setIsRememberedChecked(e.target.checked);
  // };
  let content;

  if (!linkExpired)
    content = (
      <div className="loginPageFormDiv col-12 col-lg-4 col-md-6 offset-lg-4 offset-md-3 mt-3">
        <p>Change Password</p>
        <form className="mt-2" onSubmit={handleSubmit}>
          {formStep === 1 ? (
            <div class="form-group">
              <label for="exampleInputEmail1">Enter Email</label>
              <input
                onChange={handleEmailChange}
                value={email}
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              {emailError ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {emailError}
                </div>
              ) : null}
            </div>
          ) : null}
          {formStep === 2 ? (
            <div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
                {passwordError ? (
                  <div
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {passwordError}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          <button type="submit" class="btn btn-primary loginButton mt-2">
            Submit
          </button>
        </form>
      </div>
    );

  if (submitted)
    content = (
      <div
        style={{ textAlign: "center" }}
        className="loginPageFormDiv col-12 col-lg-4 col-md-6 offset-lg-4 offset-md-3 mt-3"
      >
        <h5>Please, check your email to change your password</h5>
        <p>Reset link is valid for 1 hour only.</p>
      </div>
    );

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(${backImg})`,
      }}
      className="loginPageMainDiv"
    >
      <div className="container">
        <div className="loginScreenRow1">
          <h2>
            <strong>Snaxa</strong>
          </h2>
          {error && (
            <Modal isOpen={errorAlert} toggle={handleCloseAlert}>
              <ModalHeader toggle={handleCloseAlert}>
                Something Went Wrong
              </ModalHeader>
              <ModalBody>{error}</ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={handleCloseAlert}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          )}
          {content}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
