import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const GoogleButton = ({ onClick }) => <Button color='google plus' onClick={onClick}><Icon name='google' /> Google</Button>;

export default GoogleButton;