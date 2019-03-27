import React, { Component } from "react";
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/css/react-flags-select.css';
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/type";
import * as actionCreater from "../../Store/Actions/BlockFeatureActions";
import { countries } from 'country-data';

import {
    FormGroup,
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal
} from 'reactstrap';

class BlockFeaturesModel extends Component {
    initState = {
        all_features: false,
        country: "",
        country_code: "",
        features: this.props.features.map(f => ({
            checked: false,
            ...f,
        })),

        processing: false,
        isOpen: false,
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


    create = () => {

        this.setState({
            processing: true
        });

        let { user, create, dispatch, alertify, errorHandler } = this.props;
        let {country_code,all_features,country,features} = this.state;

        const params = {
            country_code,
            all_features,
            country,
            features:features.filter(f => f.checked).map(f => f.key)
        }

        create(user.auth.access_token, params).then(res => {

            dispatch({
                type: actions.CREATE_BLOCKFEATURE,
                payload: res.data.data
            });

            this.setState({ ...this.initState });

            alertify.success(res.data.message);

        }).catch(errorHandler).finally(() => {
            this.setState({
                processing: false
            });
        });

    };

    onCheckBoxChange = e => {
        const key = e.target.name;
        const checked = e.target.checked
        const { features } = this.state;
        let newFeatures = features.map(f => {
            if (f.key === key) {
                return { ...f, checked }
            }
            return { ...f }
        });

        this.setState({
            features: newFeatures
        });


        console.log("new Features", newFeatures);
    };


    render() {
        // next line contain un used variables, fixed in next line
        // const { all_features, feature, country, country_code, isOpen, processing, features } = this.state;
        
        const { isOpen, processing, features } = this.state;

        return (


            <React.Fragment>

                <button type="button" onClick={this.toggle} className="btn btn-danger" >Block Features</button>


                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary">

                    <ModalHeader toggle={this.toggle}> Choose Countory</ModalHeader>

                    <ModalBody>


                        <FormGroup>
                            <ReactFlagsSelect
                                searchPlaceholder="Search for a country"
                                searchable={true}
                                onSelect={country_code => this.setState({
                                    country_code,
                                    country: countries[country_code].name
                                })} />
                        </FormGroup>

                        <FormGroup>

                            <div className="row">

                                {features.map(p => (
                                    <div className="col-sm-6 py-3 pl-4">
                                        <input onChange={this.onCheckBoxChange} type="checkbox" name={p.key} className="mr-2" />
                                        {p.value}
                                    </div>
                                ))}


                            </div>

                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>

                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                        <Button color="danger" onClick={this.create}>{(processing) ? "Saving..." : "Save"}</Button>{' '}

                    </ModalFooter>

                </Modal>
            </React.Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        metaData: state.MetaDataReducer
    };
};
const mapDispatchToProps = () => {
    return {
        create: (token, params) => actionCreater.createBlockFeature(token, params),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockFeaturesModel);
