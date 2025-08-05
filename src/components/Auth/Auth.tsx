import { Alert } from '@mui/material'
import './Auth.css'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export function Login() {
  const [authError, setAuthError] = useState<null | string>(null)
  let navigate = useNavigate()

  async function login(e: React.FormEvent<HTMLFormElement>): Promise<any | undefined> {
    e.preventDefault()
    const loginUrl = `https://0jl0v93oi5.execute-api.eu-central-1.amazonaws.com/auth/login`

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
          <h3 className='AuthHeader'>Welcome back!</h3>
          <label className='AuthLabel'>Username</label>
          <input id='username' type='text' className='AuthInput'></input>
          <br />
          <label className='AuthLabel'>Password</label>
          <input id='password' type='password' className='AuthInput'></input>
          <br />
          <button type='submit' className='AuthBtn'>Login</button><br />
          <p>New? <Link className='AuthLink' to={'/auth/signup/'}>Sign-up</Link></p>
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
    const signupUrl = `https://0jl0v93oi5.execute-api.eu-central-1.amazonaws.com/auth/signup`

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
          <h3 className='AuthHeader'>Join us!</h3>
          <label className='AuthLabel'>Username</label>
          <input id='username' type='text' className='AuthInput'></input>
          <br />
          <label className='AuthLabel'>Password</label>
          <input id='password' type='password' className='AuthInput'></input>
          <br />
          <br />
          <button type='submit' className='AuthBtn'>Signup</button><br />
          <p>Already registered? <Link className='AuthLink' to={'/auth/login'}>Sign-in</Link></p>
        </form>
      </div>
    </>
  )
}


export function AuthManagement() {
  const user = localStorage.getItem('user')

  if (user) {
    return (
      <>
        <Link to='/' reloadDocument onClick={() => localStorage.removeItem('user')} className='AuthLink'> logout</Link>
      </>
    )
  } else {
    return (
      <Link to='auth/signup' className='AuthLink'> signup</Link>
    )
  }
  }