import axios from 'axios';
import { baseURL } from '../helper/baseURL';
export const loginCall = async (user, dispatch) => {
  dispatch({ type: 'LOGIN_START' });

  try {
    const res = await axios.post(`${baseURL}/login`, user, {
      withCredentials: true,
    });
    console.log(res.data._id);
    localStorage.setItem('id', JSON.stringify(res.data._id));
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
      baseURL + `/users/${updateUser.userId}`,
      updateUser
    );
    await dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
  } catch (err) {
    dispatch({ type: 'LOGIN_ERROR', payload: err });
  }
};
