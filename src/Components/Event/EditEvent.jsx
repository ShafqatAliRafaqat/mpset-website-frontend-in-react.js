import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/type";
import * as actionCreater from "../../Store/Actions/EventActions";
import LocationModal from "../Common/Location/LocationModal";
import FileBase64 from 'react-file-base64';
import UserSelect from "../User/UserSelect";

import {
    Button,
    ModalFooter,
    ModalBody,
    ModalHeader,
    Modal
} from 'reactstrap';

class EditEvent extends Component {
    initState = {
        // ...this.props.eventData,
        eventData: null,
        event: null,
        processing: false,
        isOpen: false,
        isLoading: true,
        id: this.props.eventData.id,
        PublicStatus: null,
        address:  null,
        date:  null,
        date_string:  null, 
        duration:  null,
        game_profile_string:  null,
        game_type_string:  null,
        host_name:  null,
      
        max_players:  null,
        min_players:  null,
        name:  null,
        no_of_players:  null,
        rating:  null,
        status:  null,
        table_rules:  null,
        time:  null,
    };

    state = {
        ...this.initState
    };

    getFiles(files) {
        this.setState({ file_1: files })
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };



    eventDetail = (id) => {

        this.setState({
            isLoading: true
        });

        let { eventDetail, user, errorHandler } = this.props;

        eventDetail(user.auth.access_token, id).then(res => {

            this.setState({
                ...res.data.data
            });

        }).catch(errorHandler).finally(() => {
            this.setState({
                isLoading: false
            });
        });
    };


    componentDidMount() {
        this.eventDetail(this.state.id);
    };

    edit = () => {

        this.setState({
            processing: true
        });

        let { user, edit, dispatch, alertify, errorHandler } = this.props;

        let {
            name, game_type, isPrivate, game_date, address, game_profile, time,
            re_buyins, small_blind, big_blind, min_buyins, max_buyins,
            users, purchase_amount, min_players, max_players, table_rules,
            location, valid_start_date, valid_end_date, file_1, votingEnabled } = { ...this.state };

        const params = {
            name, game_type, isPrivate,game_date, game_profile, votingEnabled, time,
            re_buyins, small_blind, big_blind, min_buyins, max_buyins, purchase_amount, min_players, max_players, table_rules,
            location: { ...location, address, images: file_1.map(u => u.base64) }, valid_start_date, valid_end_date, users: users.map(u => u.id)
        };

        edit(user.auth.access_token, params.id, params).then(res => {

            dispatch({
                type: actions.EDIT_EVENT,
                payload: res.data.data
            });

            this.setState({
                isOpen: false
            });

            alertify.success(res.data.message);

        }).catch(errorHandler).finally(() => {
            this.setState({
                processing: false
            });
        });
    };

    renderLocation = (isHead = true, model = null) => {
        return <LocationModal centerAroundCurrentLocation onLocationChange={l => { this.setState({ location: l }) }} style={{ width: '85%', height: '90%' }} modalStyle={{ width: '100%', height: '400px' }} />
    }
    cashfields = () => {
        let { isLoading } = this.state;
        if (isLoading) {
            return false;
        }
        let { purchase_amount, re_buyins, game_type: m } = this.state;
        if (m === "cash" || m === "cash/tournament") {
            return (
                <React.Fragment>
                    <div className="form-group row">
                        <label for="purchase_amount" className="col-sm-3 col-form-label">Purchase Amount</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control pull-left" name="purchase_amount" value={purchase_amount} onChange={this.onChange} id="purchase_amount" placeholder="Please Enter Purchase Amount" />
                        </div>
                    </div>
                    <div className="form-group row op-cash">
                        <label for="re_buyins" className="col-sm-3 col-form-label">Re Buyin's</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control pull-left" name="re_buyins" value={re_buyins} onChange={this.onChange} id="re_buyins" placeholder="Please Enter Re Buyin's" />
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
    Tournamentfields = () => {
        let { isLoading } = this.state;
        if (isLoading) {
            return false;
        }
        let {
            small_blind, big_blind,
            min_buyins, max_buyins, game_type: m } = this.state;
        if (m === "tournament" || m === "cash/tournament") {
            return (
                <React.Fragment>
                    <div className="form-group row">
                        <label for="small_blind" className="col-sm-3 col-form-label">Small Blind</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control pull-left" name="small_blind" value={small_blind} onChange={this.onChange} id="small_blind" placeholder="Please Enter Small Blind" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="big_blind" className="col-sm-3 col-form-label">Big Blind</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control pull-left" name="big_blind" value={big_blind} onChange={this.onChange} id="big_blind" placeholder="Please Enter Big Blind" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="min_buyins" className="col-sm-3 col-form-label">Min Buyin's</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control pull-left" name="min_buyins" value={min_buyins} onChange={this.onChange} id="min_buyins" placeholder="Please Enter Min Buyin's" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="max_buyins" className="col-sm-3 col-form-label">Max Buyin's</label>
                        <div className="col-sm-9">
                            <input type="number" className="form-control pull-left" name="max_buyins" value={max_buyins} onChange={this.onChange} id="max_buyins" placeholder="Please Enter Max Buyin's" />
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
    privatefields = () => {
        let { isLoading } = this.state;
        if (isLoading) {
            return false;
        }
        let {
            valid_start_date, valid_end_date, votingEnabled,
            PublicStatus: m } = this.state;


        if (m === "1") {
            return (
                <React.Fragment>
                    <div className="form-group row">
                        <label for="valid_start_date" className="col-sm-3 col-form-label">Avaliable Start Date</label>
                        <div className="col-sm-9">
                            <input type="date" className="form-control pull-left" name="valid_start_date" value={valid_start_date} onChange={this.onChange} id="valid_start_date" placeholder="Please Select valid Start Date" />
                        </div>
                    </div>
                    <div className="form-group row ">
                        <label for="valid_end_date" className="col-sm-3 col-form-label">Avaliable End Date</label>
                        <div className="col-sm-9">
                            <input type="date" className="form-control pull-left" name="valid_end_date" value={valid_end_date} onChange={this.onChange} id="valid_end_date" placeholder="Please Select valid End Date" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="votingEnabled" className="col-sm-3 col-form-label">Voting</label>
                        <div className="col-sm-9">
                            <select name="votingEnabled" value={votingEnabled} onChange={this.onChange} id="votingEnabled" className="form-control pull-left" >
                                <option >Select Voting</option>
                                <option value="1">Enabled</option>
                                <option value="0">Disabled</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="users" className="col-sm-3 col-form-label">Players</label>
                        <div className="col-sm-9">
                            <UserSelect
                                isMulti
                                {...this.props}
                                onChange={users => this.setState({ users })}
                                placeholder="Please Select Players you want to add fot this event"
                                search="users"
                            />
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
    render() {


        let { processing, isOpen, isLoading } = this.state;

        if (isLoading) {
            return false;
        }

        let {
            name, game_type_string, PublicStatus, date, address, game_profile_string, time,
            min_players, max_players, table_rules } = this.state;

        console.log(this.state);

        return (
            <React.Fragment>

                <button type="button" onClick={this.toggle} className="dropdown-item" > <i className="fas fa-edit"> </i> Edit</button>

                <Modal isOpen={isOpen} toggle={this.toggle} className="modal-primary modal-lg">

                    <ModalHeader toggle={this.toggle}><i className="fa fa-edit"></i>  Edit Event</ModalHeader>

                    <ModalBody>
                        <div className="main-content-container container-fluid">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group row">
                                        <label for="name" className="col-sm-3 col-form-label">Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control pull-left" name="name" value={name} onChange={this.onChange} id="name" placeholder="Please Enter Event Name" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="game_profile_string" className="col-sm-3 col-form-label">Game Profile</label>
                                        <div className="col-sm-9">
                                            <select name="game_profile_string" value={game_profile_string} onChange={this.onChange} id="game_profile" className="form-control pull-left" >
                                                <option value="texas_holdem">Texas Holdem</option>
                                                <option value="dealer_choice">Dealer Choice</option>
                                                <option value="omaha">Omaha</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="game_type_string" className="col-sm-3 col-form-label">Game Type</label>
                                        <div className="col-sm-9">
                                            <select name="game_type_string" value={game_type_string} onChange={this.onChange} id="game_type_string" className="form-control pull-left" >
                                                <option value="cash">Cash</option>
                                                <option value="tournament">Tournament</option>
                                                <option value="cash/tournament">Cash/Tournament</option>
                                            </select>
                                        </div>
                                    </div>
                                    {this.Tournamentfields()}
                                    {this.cashfields()}
                                    <div className="form-group row">
                                        <label for="PublicStatus" className="col-sm-3 col-form-label">Event Type</label>
                                        <div className="col-sm-9">
                                            <select name="PublicStatus" value={PublicStatus} onChange={this.onChange} id="PublicStatus" className="form-control pull-left" >
                                                <option value="Public">Public</option>
                                                <option value="Private">Private</option>
                                            </select>
                                        </div>
                                    </div>
                                    {this.privatefields()}
                                    <div className="form-group row">
                                        <label for="date" className="col-sm-3 col-form-label">Date</label>
                                        <div className="col-sm-9">
                                            <input type="date" className="form-control pull-left" name="date" value={date} onChange={this.onChange} id="date" placeholder="Please Select Date" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="Time" className="col-sm-3 col-form-label">Time</label>
                                        <div className="col-sm-9">
                                            <input type="time" className="form-control pull-left" name="time" value={time} onChange={this.onChange} id="time" placeholder="Please Select Time" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label for="max_players" className="col-sm-3 col-form-label">Maximum Players</label>
                                        <div className="col-sm-9">
                                            <input type="number" className="form-control pull-left" name="max_players" value={max_players} onChange={this.onChange} id="max_players" placeholder="Please Enter Maximum No. of Players" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="min_players" className="col-sm-3 col-form-label">Minimum Players</label>
                                        <div className="col-sm-9">
                                            <input type="number" className="form-control pull-left" name="min_players" value={min_players} onChange={this.onChange} id="min_players" placeholder="Please Enter Minimum No. of Players" />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label for="table_rules" className="col-sm-3 col-form-label">Table Rules</label>
                                        <div className="col-sm-9">
                                            <textarea name="table_rules" id="table_rules" className="form-control pull-left" value={table_rules} onChange={this.onChange} placeholder="Please Enter Table Rules Here..." rows="4"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="address" className="col-sm-3 col-form-label">Address</label>
                                        <div className="col-sm-9">
                                            <textarea name="address" id="address" className="form-control pull-left" value={address} onChange={this.onChange} placeholder="Please Enter Address" rows="4"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="file_1" className="col-sm-3 col-form-label">Location Image</label>
                                        <div className="col-sm-9">
                                            <FileBase64
                                                multiple={true}
                                                className="form-control pull-left"
                                                onDone={this.getFiles.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label for="location" className="col-sm-3 col-form-label">Select Location</label>
                                        <div className="col-sm-9 event-edit-location">
                                            <div className="input-group">
                                                {this.renderLocation()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>

                        <Button color="secondary" onClick={this.toggle}>Close</Button>
                        <Button color="danger" onClick={this.editEvent}>{(processing) ? "Updating..." : "Update"}</Button>{' '}

                    </ModalFooter>

                </Modal>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        metaData: state.MetaDataReducer,
        events: state.EventReducer.events,
    };
};
const mapDispatchToProps = () => {
    return {
        eventDetail: (token, id) => actionCreater.eventDetail(token, id),
        editEvent: (token, id, data) => actionCreater.editEvent(token, id, data),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditEvent);