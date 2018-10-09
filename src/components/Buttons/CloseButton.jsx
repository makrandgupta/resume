import React from 'react';
import { Button } from 'semantic-ui-react';

const CloseButton = ({ onClick }) => <Button onClick={onClick} circular icon="close"></Button>;

export default CloseButton;