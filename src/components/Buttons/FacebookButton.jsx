import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const FacebookButton = ({ onClick }) => <Button color='facebook' onClick={onClick}><Icon name='facebook' /> Facebook</Button>;

export default FacebookButton;