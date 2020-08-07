import React, { createContext, useReducer, useState, useEffect } from 'react'
import { firebaseAuth } from '../../firebase'
import { AuthReducers } from '../reducers/AuthReducers'
import { SetUserAction } from '../actions/AuthActions'

import Loading from '../commons/Loading'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initAuth = {
    loading: true,
    user: null,
    error: null,
    message: null
  }

  const [auth_state, auth_dispatch] = useReducer(AuthReducers, initAuth);
  const [authSubmiting, setAuthSubmiting] = useState(false);

  firebaseAuth.onAuthStateChanged(user => {
    if (!auth_state.loading) return;
    SetUserAction(auth_dispatch, user);
  });

  useEffect(() => {
    if (!auth_state.loading) {
      setAuthSubmiting(false);
      return;
    }
  }, [auth_state]);

  return (
    <AuthContext.Provider value={{ auth_state, auth_dispatch, setAuthSubmiting }}>
      {auth_state.loading || authSubmiting ? <Loading /> : children}
    </AuthContext.Provider>
  )
}
