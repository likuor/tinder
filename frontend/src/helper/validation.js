const messageEmpty = 'Empty is not valid!';
const messageNotEnough =
  'Password must be more than 8 chracters with at least 1 uppercase and 1 number';
const messageNotMatch = 'Password does not match to confirm password';

const checkEmail = (refValue, state, setState) => {
  if (!refValue) {
    setState((prevState) => ({
      ...prevState,
      input: '',
      errMessage: messageEmpty,
    }));
    return state;
  }
  // console.log('here',state);
  setState((prevState) => ({
    ...prevState,
    input: refValue,
    errMessage: '',
  }));
  return true;
};

const checkPassword = (refValue, state, setState) => {
  if (!/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,20}$/.test(refValue)) {
    setState((prevState) => ({
      ...prevState,
      input: '',
      errMessage: messageNotEnough,
    }));
    return state;
  }
  setState((prevState) => ({
    ...prevState,
    input: refValue,
    errMessage: '',
  }));
  return true;
};

const checkConfirmPassword = (refValue, refConfirmValue, state, setState) => {
  if (!refConfirmValue) {
    setState((prevState) => ({
      ...prevState,
      input: '',
      errMessage: messageEmpty,
    }));
    return state;
  } else if (refValue !== refConfirmValue) {
    setState((prevState) => ({
      ...prevState,
      input: '',
      errMessage: messageNotMatch,
    }));
    return state;
  }
  setState((prevState) => ({
    ...prevState,
    input: refValue,
    errMessage: '',
  }));
  return true;
};

export { checkEmail, checkPassword, checkConfirmPassword };
