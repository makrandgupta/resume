import React from 'react';
import FacebookButton from './Buttons/FacebookButton';
import GithubButton from './Buttons/GithubButton';
import GoogleButton from './Buttons/GoogleButton';



const Login = ( { authenticate }) => (
  <nav>
    <h2>Login</h2>

    <p>Sign in to manage your resume.</p>

    <GithubButton onClick={() => authenticate('Github')}/>
    <GoogleButton onClick={() => authenticate('Google')}/>
    <FacebookButton onClick={() => authenticate('Facebook')}/>
  </nav>
);

export default Login;