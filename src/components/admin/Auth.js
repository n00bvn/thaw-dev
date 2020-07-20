import React, { useState } from 'react'
import { firebaseAuth } from '../../firebase'

import Loading from '../Loading'

export default function Auth({ setAdmin }) {
  const initState = {
    email: '',
    password: ''
  }

  const [state, setState] = useState(initState);
  const [loggingIn, setLoggingIn] = useState(false);

  const handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    setLoggingIn(true);
    const { email, password } = state;
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        setAdmin(firebaseAuth.currentUser);
      })
      .catch(error => {
        alert('ERROR');
        console.log(error);
        setLoggingIn(false);
      })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-8 text-center">
          <h1>Login</h1>
          <div className="mt-5">
            {loggingIn ? <Loading /> : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
