import React from 'react';
import FacebookButton from './components/FacebookButton';
import GithubButton from './components/GithubButton';
import GoogleButton from './components/GoogleButton';

const SignIn = ( { authenticate }) => (
  <nav>
    <p>Sign in to manage your resume.</p>

    <GithubButton onClick={() => authenticate('Github')}/>
    <GoogleButton onClick={() => authenticate('Google')}/>
    <FacebookButton onClick={() => authenticate('Facebook')}/>
  </nav>
);

export default SignIn;