import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const SignOutButton = ({ onClick }) => <Button onClick={onClick}><Icon name='sign-out' /> Sign Out</Button>;

export default SignOutButton;