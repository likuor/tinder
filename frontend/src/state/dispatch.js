import axios from 'axios';

export const loginCall = async (user, dispatch) => {
  dispatch({ type: 'LOGIN_START' });
  const baseURL = 'http://localhost:8000/login';

  try {
    const res = await axios.post(baseURL, user);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: err });
  }
};

export const logoutCall = async (dispatch) => {
  dispatch({ type: 'LOGIN_START' });
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
