import { Alert } from '@mui/material'
import './Auth.css'
import React, { useState } from 'react'
import { Link, replace, useNavigate } from 'react-router-dom'


export function Login() {
  const [authError, setAuthError] = useState<null | string>(null)
  let navigate = useNavigate()

  async function login(e: React.FormEvent<HTMLFormElement>): Promise<any | undefined> {
    e.preventDefault()
    const loginUrl = `${process.env.REACT_APP_URL}/auth/login`

    let formData = new FormData()

    const username = e.target[0].value
    const password = e.target[1].value

    if (!(username || password)) {
      setAuthError("Please fill all of the fields")
      return
    }

    formData.append('username', username)
    formData.append('password', password)

    const payload = {
      method: "POST",
      body: formData
    }

    try {
      const response = await fetch(loginUrl, payload)
      if (!response.ok) {
        if (response.status === 404) {
          setAuthError("User not found, please sign up.")
          return
        } else if (response.status === 403) {
          setAuthError("Credentials not valid, please try again")
          return
        }
        setAuthError('Something went wrong with the signin process, please try again')
        return
      }
      const json = await response.json()
      localStorage.setItem('user', json['access_token'])
      navigate('/', {replace: true})
    } catch (e) {
      setAuthError("Something went wrong during the login, please try again")
    }

  }

  return (
    <>
      <div className='AuthContainer'>
        {authError && <Alert severity='error' className='AuthAlert' onClose={() => {setAuthError(null)}}>{authError}</Alert>}
        <form className='Auth' onSubmit={(e) => login(e)}>
          <label className='AuthLabel'>Username</label>
          <input id='username' type='text' className='AuthInput'></input>
          <br />
          <label className='AuthLabel'>Password</label>
          <input id='password' type='password' className='AuthInput'></input>
          <br />
          <button type='submit' className='AuthBtn'>Login</button>
          <p>New? <Link to={'/auth/signup/'}>Sign-up</Link></p>
        </form>
      </div>
    </>
  )
}


export function SignUp() {
  const [authError, setAuthError] = useState<null | string>(null)
  let navigate = useNavigate()

  async function signup(e: React.FormEvent<HTMLFormElement>): Promise<undefined> {
    e.preventDefault()
    const signupUrl = `${process.env.REACT_APP_URL}/auth/signup`

    const username = e.target[0].value
    const password = e.target[1].value

    if (!(username || password)) {
      setAuthError("Please fill all of the fields")
      return
    } else if (password.length < 8) {
      setAuthError("Password must be at least 8 characters long")
      return
    }

    const formData = new FormData()
    formData.append('username', username)
    formData.append('password', password)

    const payload = {
      method: "POST",
      body: formData
    }

    try {
      const response = await fetch(signupUrl, payload)
      if (!response.ok) {
        if (response.status === 409) {
          setAuthError("User already exists, please sign in")
          return
        }
        setAuthError("Something went wrong during the signup, please try again")
        return
      }
      const json = await response.json()
      localStorage.setItem('user', json['access_token'])
      navigate('/', { replace: true })
    } catch (e) {
      console.log(e)
      setAuthError("Something went wrong during the signup, please try again")
    }
  }

  return (
    <>
      <div className='AuthContainer'>
      {authError && <Alert severity='error' className='AuthAlert' onClose={() => {setAuthError(null)}}>{authError}</Alert>}
        <form className='Auth' onSubmit={(e) => {signup(e)}}>
          <label className='AuthLabel'>Username</label>
          <input id='username' type='text' className='AuthInput'></input>
          <br />
          <label className='AuthLabel'>Password</label>
          <input id='password' type='password' className='AuthInput'></input>
          <br />
          <br />
          <button type='submit' className='AuthBtn'>Signup</button>
          <p>Already registered? <Link to={'/auth/login'}>Sign-in</Link></p>
        </form>
      </div>
    </>
  )
}


export function AuthManagement({ display }) {
  return (
    <>
      <dialog className='AuthManagement' style={{display: display}}>
          <nav className='NavBar AuthNav' ></nav>
          <div className='AuthDisplay'>
            <h4>Auth</h4>
            <p>
              If you have not tried the application yet, I invite you to
              <Link to='auth/signup' className='AuthLink'> signup</Link>!<br /><br />
              < hr/>
              If you have already signed up, then welcome back and
              <Link to='auth/login' className='AuthLink'> login</Link>! <br /><br />
              < hr/>
              It's sad if you're going away...
              <Link to='/' onClick={() => localStorage.removeItem('user')} className='AuthLink'> logout</Link><br /><br />
              < hr />
              For any info, complaints, or praises send an email at: tambascomarco35@gmail.com
            </p>
          </div>
      </dialog>
    </>
  )
}