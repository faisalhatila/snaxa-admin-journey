import { useState, useCallback, useEffect } from "react";
// import { AuthContext } from "./../context/auth-context";

// let logoutTimer;

export const useAuth = () => {
	const [token, setToken] = useState(null);
	// const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(null);

	const login = useCallback((
		uId,
		token
		// expirationDate
	) => {
		setToken(token);
		setUserId(uId);
		// const tokenExpirationDate =
		// 	expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		// setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			"userData",
			JSON.stringify({
				userId: uId,
				token: token,
				// expirationDate: tokenExpirationDate.toISOString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		// setTokenExpirationDate(null);
		setUserId(null);
		localStorage.removeItem("userData");
	}, []);

	// useEffect(() => {
	// if (token && tokenExpirationDate) {
	// 	const remainingTime =
	// 		tokenExpirationDate.getTime() - new Date().getTime();
	// 	logoutTimer = setTimeout(logout, remainingTime);
	// } else {
	// 	clearTimeout(logoutTimer);
	// }
	// }, []);

	// const firstLogin = () => {
	// 	console.log("logging");
	// 	const storedData = JSON.parse(localStorage.getItem("userData"));
	// 	if (
	// 		storedData &&
	// 		storedData.token &&
	// 		new Date(storedData.expirationDate) > new Date()
	// 	) {
	// 		login(
	// 			storedData.userId,
	// 			storedData.token,
	// 			new Date(storedData.expirationDate)
	// 		);
	// 	}
	// };

	useEffect(() => {
		// console.log("logging");
		const storedData = JSON.parse(localStorage.getItem("userData"));
		if (
			storedData &&
			storedData.token
			// &&
			// new Date(storedData.expirationDate) > new Date()
		) {
			login(
				storedData.userId,
				storedData.token
				// new Date(storedData.expirationDate)
			);
		}
	}, [login]);

	return {
		token,
		login,
		logout,
		userId,
		// firstLogin,
	};
};
