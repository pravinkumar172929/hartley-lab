import { Box, Container } from "@mui/material";
import React from "react";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Welcome from "./components/Welcome/Welcome";
import Register from "./components/Register/Register";
import { useSelector, useDispatch } from 'react-redux'
import { setLoginError, setLoginSuccess, setRegisterError, setRegisterSuccess, toggleShowLogin } from "./store/appSlice";


export default function App() {
  const isLoggedIn = useSelector(state => state.app.isLoggedIn);
  const showLogin = useSelector(state => state.app.showLogin);
  const loginError = useSelector(state => state.app.login.error);
  const registerError = useSelector(state => state.app.register.error);
  const registerData = useSelector(state => state.app.register.data);
  const dispatch = useDispatch();

  const onLoginError = (error) => {
    dispatch(setLoginError(error));
  };

  const onLoginSuccess = (data) => {
    dispatch(setLoginSuccess(data));
  };

  const onRegisterError = (error) => {
    dispatch(setRegisterError(error));
  };

  const onRegisterSuccess = (data) => {
    dispatch(setRegisterSuccess(data));
  };

  const doToggleShowLogin = () => {
    dispatch(toggleShowLogin());
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Container sx={{ marginTop: "30px", marginBottom: "30px" }}>
        {isLoggedIn
          ? <Welcome />
          : showLogin
            ? <Login onLoginError={onLoginError} onLoginSuccess={onLoginSuccess} loginError={loginError} doToggleShowLogin={doToggleShowLogin} />
            : <Register
                onRegisterError={onRegisterError}
                onRegisterSuccess={onRegisterSuccess}
                registerError={registerError}
                doToggleShowLogin={doToggleShowLogin}
                registerData={registerData}
              />}
      </Container>
      <Footer />
    </Box>
  );
}
