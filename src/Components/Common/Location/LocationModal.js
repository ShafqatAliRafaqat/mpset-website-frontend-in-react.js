import React, { Component } from "react";
import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal
} from 'reactstrap';

import LocationSelector from "./LocationSelector";

class LocationModal extends Component {

  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  };

  render() {
    const { modalStyle } = this.props;
// console.log(location);
    return (
      
      <React.Fragment>
        <button type="button" onClick={this.toggle} style={{ background: 'none', border: 'none', cursor: 'pointer' }} >
          <i className="px-1 fas fa-location-arrow" title="View Location Map"></i>
        </button>
        <Modal isOpen={this.state.isOpen} toggle={this.toggle} className="modal-success modal-md">
          <ModalHeader toggle={this.toggle}>Set Location</ModalHeader>
          <ModalBody style={modalStyle}>
            <LocationSelector {...this.props}  />
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggle}>Done</Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

export default LocationModal;
