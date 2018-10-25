import React from 'react';
import { Button, Icon } from 'semantic-ui-react';


const Login = ( { authenticate }) => (
  <nav>
    <h2>Login</h2>

    <p>Sign in to manage your resume.</p>

    <Button color='black' onClick={() => authenticate('Github')}>
      <Icon name='github' /> Github
    </Button>

    <Button color='google plus' onClick={() => authenticate('Google')}>
      <Icon name='google' /> Google
    </Button>

    <Button color='facebook' onClick={() => authenticate('Facebook')}>
      <Icon name='facebook' /> Facebook
    </Button>
  </nav>
);

export default Login;