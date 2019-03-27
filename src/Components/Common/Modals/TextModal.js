import React, { Component } from "react";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal
} from 'reactstrap';


class TextModal extends Component {

    state = {
        isOpen: false,
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.text !== prevState.text) {
            return { ...prevState, text: nextProps.text };
        }
        return null;
    }

    render() {

        const { isOpen } = this.state;
        const { text, title, icon } = this.props;

        return (
            <React.Fragment>

                <Button block color="link" onClick={this.toggle} className="mr-1">
                    <i className={icon} />
                </Button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-success">

                    <ModalHeader toggle={this.toggle}><i className={icon} /> {title}</ModalHeader>

                    <ModalBody>
                        <p>{text}</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>

                </Modal>
            </React.Fragment>
        );
    }

}

export default TextModal;