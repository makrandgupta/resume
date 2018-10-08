import React from 'react';
import { Button } from 'semantic-ui-react';

const CloseButton = (props) => <Button onClick={props.onClick} circular icon="close"></Button>

export default CloseButton;