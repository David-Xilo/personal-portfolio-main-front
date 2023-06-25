/** @jsx jsx */
import {jsx} from '@emotion/react'

import * as React from 'react'
import {useNavigate, Route, Routes} from 'react-router-dom'
import {ErrorBoundary} from 'react-error-boundary'
import { ErrorFallback } from './navigation'
import { useState, cloneElement } from 'react'
import {Input, Button, FormGroup, ErrorMessage} from '../components/lib'
import {useAuth} from '../context/auth-context'
import {useAsync} from '../utils/hooks'
import {useMain} from '../main-app'


function useLogin() {
    const navigate = useNavigate();

    console.log("useLogin")
    const renderLogin = () => {
      navigate('/account'); 
    };
  
    return {
        renderLogin,
    };
  }


function LoginForm({ onSubmit, submitButton, handleBackClick }) {
  const { isError, error, run } = useAsync();

  function handleSubmit(event) {
    event.preventDefault();
    const { username, password } = event.target.elements;

    run(
      onSubmit({
        username: username.value,
        password: password.value,
      })
    );
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          '> div': {
            margin: '10px auto',
            width: '100%',
            maxWidth: '300px',
          },
        }}
      >
        <FormGroup>
          <label htmlFor="username">Username</label>
          <Input id="username" />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" />
        </FormGroup>
        <div>
          {cloneElement(
            submitButton,
            { type: 'submit' },
            ...(Array.isArray(submitButton.props.children)
              ? submitButton.props.children
              : [submitButton.props.children])
          )}
        </div>
        {isError ? <ErrorMessage error={error} /> : null}
      </form>
      <Button onClick={handleBackClick}>Back</Button>
    </div>
  );
}

function LoginScreen({ handleRegisterClick, handleLoginClick }) {
  const { renderMainApp } = useMain();
  console.log("LoginScreen")
  return (
    <>
          <h1>Safehouse</h1>
          <div
            css={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gridGap: '0.75rem',
            }}
          >
            <Button variant="secondary" onClick={handleRegisterClick}>
              Register
            </Button>
            <Button variant="primary" onClick={handleLoginClick}>
              Login
            </Button>
            <Button variant="terciary" onClick={renderMainApp}>
              Back
            </Button>
          </div>
        </>
  )
}

function Login() {
    const {login, register} = useAuth()
    
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
  
    const handleRegisterClick = () => {
      setShowRegisterForm(true);
    };
  
    const handleLoginClick = () => {
      setShowLoginForm(true);
    };
  
    const handleBackClick = () => {
      setShowLoginForm(false);
      setShowRegisterForm(false);
    };

    return (
        <div
            css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh',
            }}
            >
      {!showLoginForm && !showRegisterForm && (
        <LoginScreen 
          handleRegisterClick={handleRegisterClick} 
          handleLoginClick={handleLoginClick} 
        />
      )}
      {showLoginForm && (
        <LoginForm
          onSubmit={login}
          submitButton={<Button variant="primary">Login</Button>}
          handleBackClick={handleBackClick}
        />
      )}
      {showRegisterForm && (
        <LoginForm
          onSubmit={register}
          submitButton={<Button variant="primary">Register</Button>}
          handleBackClick={handleBackClick}
        />
      )}
    </div>
    )
}


function LoginApp() {
    const { user } = useAuth();
    const { renderLogin } = useLogin()

  return (
    <>
    {user && 
        <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user.username}
        <Button variant="secondary" css={{marginLeft: '10px'}} onClick={renderLogin}>
          Logout
        </Button>
      </div>
    }

    {!user && 
        <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        <Button variant="secondary" css={{marginLeft: '10px'}} onClick={renderLogin}>
          Login
        </Button>
      </div>
    }
    <main>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <LoginRoutes />
        </ErrorBoundary>
    </main>
    </>
    
  );
}

function LoginRoutes() {
    return (
      <Routes>
        <Route path="/account/*" element={<Login />} />
      </Routes>
    )
  }

export {LoginApp, useLogin, Login}
