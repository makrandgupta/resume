import React from 'react';
import { Button, Modal } from 'semantic-ui-react';

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Modal basic closeIcon open={this.props.open} onClose={this.props.onClose}>
        <Modal.Header>{this.props.header}</Modal.Header>
        <Modal.Content>
          {this.props.children}
        </Modal.Content>
        <Modal.Actions>
          <Button basic inverted onClick={this.props.onClose}>
            Cancel
            </Button>
          <Button
            negative
            basic
            inverted
            icon='delete'
            labelPosition='left'
            content="Delete"
            onClick={this.props.onDelete}
          />
          <Button
            positive
            basic
            icon='save'
            labelPosition='right'
            content="Save"
            onClick={this.props.onSave}
          />
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditModal;