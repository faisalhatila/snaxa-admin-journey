import React, { Component, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttpClient } from "./../../shared/hooks/http-hook";
import { AuthContext } from "./../../shared/context/index";
const LoginContainer = (props) => {
	const auth = useContext(AuthContext);
	const history = useHistory();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [emailError, setEmailError] = useState();
	const [passwordError, setPasswordError] = useState();
	const [loginCredentials, setLoginCredentials] = useState();
	const [isRememberedChecked, setIsRememberedChecked] = useState();

	const handleEmailChange = (event) => {
		console.log(event.target.value);
		setEmail(event.target.value);
		// 	emailError: "",
	};
	const handlePasswordChange = (event) => {
		console.log(event.target.value);
		setPassword(event.target.value);
		// 	passwordError: "",
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		const isValid = validate();
		if (isValid) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/login`,
					"POST",
					{
						"Content-Type": "application/json",
					},
					JSON.stringify({
						email,
						password,
					})
				);
				auth.login(responseData.userId, responseData.token);
				history.go("/");
			} catch (err) {
				console.log(error);
			}
		} else {
			console.log();
		}
	};
	const validate = () => {
		// if (!email || !email.includes("@")) {
		// 	emailError = "Please Enter Proper Email Address";
		// } else {
		// 	emailError = "";
		// }
		// if (!password) {
		// 	passwordError = "Please Enter A Valid Password";
		// } else {
		// 	passwordError = "";
		// }
		// if (emailError || passwordError) {
		// 	setState({
		// 		emailError,
		// 		passwordError,
		// 	});
		// 	return false;
		// }
		return true;
	};
	const handleCheck = (e) => {
		console.log(e.target.checked);
		setIsRememberedChecked(e.target.checked);
		// setState({
		// 	isRememberedChecked: e.target.checked,
		// });
	};
	return (
		<div
			style={{
				backgroundImage:
					"linear-gradient(0deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)), url(assets/img/loginScreen/Rectangle290.png)",
			}}
			className='loginPageMainDiv'>
			<div className='container'>
				<div className='loginScreenRow1'>
					<h2>
						<strong>Snaxa</strong>
					</h2>
					<p>Restaurant Login Panel</p>
					<div className='loginPageFormDiv col-12 col-lg-4 col-md-6 offset-lg-4 offset-md-3 mt-3'>
						<p>Login In To Your Account</p>
						<form className='mt-2'>
							<div class='form-group'>
								<label for='exampleInputEmail1'>User Name</label>
								<input
									onChange={handleEmailChange}
									value={email}
									type='email'
									class='form-control'
									id='exampleInputEmail1'
									aria-describedby='emailHelp'
									placeholder='Enter email'
								/>
								{emailError ? (
									<div
										style={{
											textAlign: "center",
											color: "red",
											fontWeight: "bold",
										}}>
										{emailError}
									</div>
								) : null}
							</div>
							<div class='form-group'>
								<label for='exampleInputPassword1'>Password</label>
								<input
									onChange={handlePasswordChange}
									value={password}
									type='password'
									class='form-control'
									id='exampleInputPassword1'
									placeholder='Password'
								/>
								{passwordError ? (
									<div
										style={{
											textAlign: "center",
											color: "red",
											fontWeight: "bold",
										}}>
										{passwordError}
									</div>
								) : null}
							</div>
							<div class='form-check'>
								<input
									type='checkbox'
									class='form-check-input'
									id='exampleCheck1'
									onChange={handleCheck}
								/>
								<label class='form-check-label' for='exampleCheck1'>
									Keep Me Looged In
								</label>
							</div>
							<button
								type='submit'
								onClick={handleSubmit}
								class='btn btn-primary loginButton mt-2'>
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
