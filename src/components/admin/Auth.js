import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { LoginAction } from '../actions/AuthActions'

export default function Auth() {
  const { auth_dispatch, setAuthSubmiting } = useContext(AuthContext);
  const initState = {
    email: '',
    password: ''
  }

  const [state, setState] = useState(initState);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    setAuthSubmiting(true);
    LoginAction(auth_dispatch, state);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8 text-center">
          <h1>Login</h1>
          <div className="mt-5">
            <form onSubmit={e => handleSubmit(e)}>
              <div className="form-group">
                <label>Email</label>
                <input type="text" className="form-control" name="email" value={state.email} onChange={e => handleChange(e)} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" name="password" onChange={e => handleChange(e)} />
              </div>

              <div className="mt-4">
                <button type="submit" className="btn btn-primary btn-lg mr-3">Log In</button>
                <a href="/" className="btn btn-secondary">Cancel</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
