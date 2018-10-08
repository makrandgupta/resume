import React from 'react';
import { Button } from 'semantic-ui-react';

const AddButton = (props) => <Button onClick={props.onClick} circular icon="add"></Button>;

export default AddButton;