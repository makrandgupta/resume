import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const GithubButton = ({ onClick }) => <Button color='black' onClick={onClick}><Icon name='github' /> Github</Button>;

export default GithubButton;