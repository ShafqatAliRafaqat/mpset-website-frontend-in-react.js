import React, { Component } from "react";
import {
  Label,
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal
} from 'reactstrap';

class DeleteModal extends Component {

  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  delete = () => {
    this.props.delete();
    this.toggle();
  };

  render() {

    let { model } = this.props;

    return (
      <React.Fragment>

        <button className="dropdown-item" onClick={this.toggle} to="" >
          <i className="fas fa-trash"> </i> Delete
        </button>

        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-danger">
          <ModalHeader toggle={this.toggle}> Confirmation</ModalHeader>
          <ModalBody>
            <Label >Are you sure to delete {model} ?</Label>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.delete}>Yes</Button>{' '}
            <Button color="success" onClick={this.toggle}>No</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}


export default DeleteModal;
