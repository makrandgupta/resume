import React from 'react';
import { Button } from 'semantic-ui-react';

const EditButton = ({ onClick }) => <Button basic onClick={onClick} circular icon="edit"></Button>;

export default EditButton;