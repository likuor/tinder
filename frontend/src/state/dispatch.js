import axios from 'axios';

export const signupCall = async (newUser) => {
  const baseURL = 'http://localhost:8000/signup';

  try {
    await axios.post(baseURL, newUser, { withCredentials: true });
  } catch (err) {
    console.log('err', err);
  }
};

// export const signupCall = async (newUser, dispatch) => {
//   dispatch({ type: 'SIGNUP_START' });
//   const baseURL = 'http://localhost:8000/signup';

//   try {
//     const res = await axios.post(baseURL, newUser, { withCredentials: true });
//     dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
//   } catch (err) {
//     dispatch({ type: 'SIGNUP_ERROR', payload: err });
//   }
// };

export const loginCall = async (user, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  const baseURL = 'http://localhost:8000/login';

  try {
    const res = await axios.post(baseURL, user, { withCredentials: true });
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: err });
  }
};

export const logoutCall = async (dispatch) => {
  dispatch({ type: 'LOGOUT_START' });
  const baseURL = 'http://localhost:8000/logout';
  try {
    await axios.get(baseURL, { withCredentials: true });

    dispatch({ type: 'LOGOUT_SUCCESS' });
  } catch (err) {
    dispatch({ type: 'LOGOUT_ERROR' });
  }
};

export const updateCall = async (updateUser, dispatch) => {
  try {
    const res = await axios.put(
      process.env.REACT_APP_SERVER_URL + `/users/${updateUser.userId}`,
      updateUser
    );
    await dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: err });
  }
};
