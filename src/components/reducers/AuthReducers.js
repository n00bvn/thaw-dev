export const AuthReducers = (state, action) => {
  console.log('AUTH REDUCER', action);
  if (action.error) {
    return {
      ...state,
      error: action.error,
      loading: false,
      message: action.error.message
    }
  } else {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,
          loading: false,
          message: null
        }
      case 'LOGIN':
        return {
          ...state,
          user: action.payload,
          loading: false,
          message: 'Successfully logged in.'
        }
      case 'LOGOUT':
        return {
          ...state,
          user: null,
          loading: false,
          message: 'Successfully logged out.'
        }
      default:
        return {
          ...state,
          user: null,
          loading: false,
          message: 'Unknown action.'
        }
    }
  }
}
