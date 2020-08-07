import { firebaseAuth } from '../../firebase'

export const SetUserAction = (dispatch, data) => {
  dispatch({
    type: 'SET_USER',
    payload: data,
    error: null
  });
}

export const LoginAction = (dispatch, data) => {
  const { email, password } = data;
  firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch({
        type: 'LOGIN',
        payload: user,
        error: null
      })
    })
    .catch(error => {
      dispatch({
        error: error
      })
    })
}

export const LogoutAction = dispatch => {
  firebaseAuth.signOut()
    .then(() => {
      dispatch({
        type: 'LOGOUT',
        error: null
      })
    })
    .catch(error => {
      dispatch({
        error: error
      })
    })
}
