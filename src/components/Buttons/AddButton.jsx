import React from 'react';
import { Button } from 'semantic-ui-react';

const AddButton = ({ onClick }) => <Button onClick={onClick} circular icon="add"></Button>;

export default AddButton;