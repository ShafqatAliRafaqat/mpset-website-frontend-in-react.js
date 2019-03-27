import React, { Component } from "react";

import {
     Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
} from 'reactstrap';

class LocationImages extends Component {
    initState = {
        ...this.props,
        processing: false,
        isOpen: false,
        activeIndex: 0
    };

    state = {
        ...this.initState
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };


    onExiting = () => {
        this.animating = true;
    }

    onExited = () => {
        this.animating = false;
    }

    next = () => {

        const { images: items } = this.props;

        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous = () => {
        const { images: items } = this.props;
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex = (newIndex) => {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }


    renderLocationImages() {

        const { activeIndex } = this.state;

        const { images: items } = this.props;

        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item}
                >
                    <img className="img img-responsive" height={350} src={item} alt={item} />
                
                </CarouselItem>
            );
        });

        return (
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        );
    }
    
    render() {

        const { isOpen, } = this.state;
        return (
            <React.Fragment>
                <button type="button" onClick={this.toggle} style={{ background: 'none', border: 'none', cursor: 'pointer' }} >
                    <i className="px-2 fas fa-images" title="View Location Images"></i>
                </button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">

                    <ModalHeader toggle={this.toggle}> Select location</ModalHeader>
                    <ModalBody>
                        {this.renderLocationImages()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>

        )
    }
}

export default LocationImages;