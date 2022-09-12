import axios from "axios";

const doLogin = async (email, password) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://reqres.in/api/login",
      data: {
        email: email,
        password: password,
      },
    });

    return {
      isSuccessful: true,
      data: response.data
    };
  } catch (error) {
    return {
      isSuccessful: false,
      error
    };
  }
};

const doRegister = async ({firstName, lastName, email, password }) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://reqres.in/api/users",
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });

    return {
      isSuccessful: true,
      data: response.data
    };
  } catch (error) {
    return {
      isSuccessful: false,
      error
    };
  }
};

export {
  doLogin,
  doRegister
};