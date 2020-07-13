import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import Router from "./routers";
import "./App.scss";
import { AuthContext } from "./shared/context/index";
import { useAuth } from "./shared/hooks/auth-hooks";
function App() {
	const { login, logout, userId, token } = useAuth();
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter>
					<div className='app'>
						<AuthContext.Provider
							value={{
								isLoggedIn: !!token,
								token: token,
								userId: userId,
								login,
								logout,
							}}>
							<Router />
						</AuthContext.Provider>
					</div>
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
}

export default App;
  