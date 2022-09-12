import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    showLogin: true,
    isLoggedIn: false,
    login: {
      isSuccessful: false,
      error: undefined,
      data: undefined
    },
    register: {
      isSuccessful: false,
      error: undefined,
      data: undefined
    }
  },
  reducers: {
    toggleShowLogin: state => {
      state.showLogin = !state.showLogin;
    },
    setLoginError: (state, data) => {
      state.isLoggedIn = false;
      state.login.isSuccessful = false;
      state.login.error = data.payload;
    },
    setLoginSuccess: (state, data) => {
      state.isLoggedIn = true;
      state.login.isSuccessful = true;
      state.login.data = data.payload;
    },
    setRegisterError: (state, data) => {
      state.register.isSuccessful = false;
      state.register.error = data.payload;
    },
    setRegisterSuccess: (state, data) => {
      state.register.isSuccessful = true;
      state.register.data = data.payload;
    },
  }
})

export const { toggleShowLogin, setLoginError, setLoginSuccess, setRegisterError, setRegisterSuccess } = appSlice.actions

export default appSlice.reducer