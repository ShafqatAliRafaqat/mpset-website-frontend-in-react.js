import React, { Component } from "react";
import { connect } from "react-redux";
import FileBase64 from 'react-file-base64';
import * as actions from "../../Store/Actions/type";
import * as actionCreater from "../../Store/Actions/EventActions";
import LocationModal from "../Common/Location/LocationModal";
import UserSelect from "../User/UserSelect"

class CreateEvent extends Component {
    initState = {
        name: "",
        game_type: "",
        isPrivate: "",
        game_date: "",
        game_profile: "",
        re_buyins: "",
        small_blind: "",
        big_blind: "",
        min_buyins: "",
        max_buyins: "",
        users: [],
        min_players: "",
        max_players: "",
        table_rules: "",
        location: [],
        valid_start_date: "",
        valid_end_date: "",
        purchase_amount: "",
        address: "",
        votingEnabled: "",
        time: "",
        files: [],
        activeTab: 1,
        processing: false,
        isOpen: false,
    }

    state = {
        ...this.initState
    };

    onChange = e => {
        this.setState({
            [e.target.name]: (e.target.files) ? e.target.files[0] : e.target.value
        });
    };
    getFiles(files) {
        this.setState({ file_1: files })
    }
    createEvent = () => {

        this.setState({
            processing: true
        });

        let { createEvent, dispatch, alertify, user, errorHandler } = this.props;

        let {
            name, game_type, isPrivate, game_date, address, game_profile, time,
            re_buyins, small_blind, big_blind, min_buyins, max_buyins,
            users, purchase_amount, min_players, max_players, table_rules,
            location, valid_start_date, valid_end_date, file_1, votingEnabled } = { ...this.state };

        // let images = file_1.map(u => u.base64);

        const params = {
            name, game_type, isPrivate, game_date, game_profile, votingEnabled, time,
            re_buyins, small_blind, big_blind, min_buyins, max_buyins, purchase_amount, min_players, max_players, table_rules,
            location: { ...location, address, images: file_1.map(u => u.base64) }, valid_start_date, valid_end_date, users: users.map(u => u.id)
        };
        createEvent(user.auth.access_token, params).then(res => {

            dispatch({
                type: actions.CREATE_EVENT,
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
    renderLocation = (isHead = true, model = null) => {
        return <LocationModal centerAroundCurrentLocation onLocationChange={l => { this.setState({ location: l }) }} style={{ width: '85%', height: '90%' }} modalStyle={{ width: '100%', height: '400px' }} />
    }
    cashfields = () => {
        let { purchase_amount, re_buyins, game_type: m } = this.state;
        if (m === "cash" || m === "cash/tournament") {
            return (
                <React.Fragment>
                    <div className="form-group row">
                        <label for="purchase_amount" className="col-sm-2 col-form-label">Purchase Amount</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control pull-left" name="purchase_amount" value={purchase_amount} onChange={this.onChange} id="purchase_amount" placeholder="Please Enter Purchase Amount" />
                        </div>
                    </div>
                    <div className="form-group row op-cash">
                        <label for="re_buyins" className="col-sm-2 col-form-label">Re Buyin's</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control pull-left" name="re_buyins" value={re_buyins} onChange={this.onChange} id="re_buyins" placeholder="Please Enter Re Buyin's" />
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
    Tournamentfields = () => {
        let {
            small_blind, big_blind,
            min_buyins, max_buyins, game_type: m } = this.state;
        if (m === "tournament" || m === "cash/tournament") {
            return (
                <React.Fragment>
                    <div className="form-group row">
                        <label for="small_blind" className="col-sm-2 col-form-label">Small Blind</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control pull-left" name="small_blind" value={small_blind} onChange={this.onChange} id="small_blind" placeholder="Please Enter Small Blind" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="big_blind" className="col-sm-2 col-form-label">Big Blind</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control pull-left" name="big_blind" value={big_blind} onChange={this.onChange} id="big_blind" placeholder="Please Enter Big Blind" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="min_buyins" className="col-sm-2 col-form-label">Min Buyin's</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control pull-left" name="min_buyins" value={min_buyins} onChange={this.onChange} id="min_buyins" placeholder="Please Enter Min Buyin's" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="max_buyins" className="col-sm-2 col-form-label">Max Buyin's</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control pull-left" name="max_buyins" value={max_buyins} onChange={this.onChange} id="max_buyins" placeholder="Please Enter Max Buyin's" />
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }
    privatefields = () => {
        let {
            valid_start_date, valid_end_date, votingEnabled,
            isPrivate: m } = this.state;
        if (m === "1") {
            return (
                <React.Fragment>
                    <div className="form-group row">
                        <label for="valid_start_date" className="col-sm-2 col-form-label">Avaliable Start Date</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control pull-left" name="valid_start_date" value={valid_start_date} onChange={this.onChange} id="valid_start_date" placeholder="Please Select valid Start Date" />
                        </div>
                    </div>
                    <div className="form-group row ">
                        <label for="valid_end_date" className="col-sm-2 col-form-label">Avaliable End Date</label>
                        <div className="col-sm-10">
                            <input type="date" className="form-control pull-left" name="valid_end_date" value={valid_end_date} onChange={this.onChange} id="valid_end_date" placeholder="Please Select valid End Date" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="votingEnabled" className="col-sm-2 col-form-label">Voting</label>
                        <div className="col-sm-10">
                            <select name="votingEnabled" value={votingEnabled} onChange={this.onChange} id="votingEnabled" className="form-control pull-left" >
                                <option >Select Voting</option>
                                <option value="1">Enabled</option>
                                <option value="0">Disabled</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label for="users" className="col-sm-2 col-form-label">Players</label>
                        <div className="col-sm-10">
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
       
        let {
            name, game_type, isPrivate, game_date, address, time,
            game_profile, min_players, max_players, table_rules, processing } = this.state;

        return (
            <div className="main-content-container container-fluid px-4">
                <div className="page-header row no-gutters py-4">
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h3 className="page-title">Add Event</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-features pt-5 pb-4 mb-4">
                            <div className="form-group row">
                                <label for="name" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control pull-left" name="name" value={name} onChange={this.onChange} id="name" placeholder="Please Enter Event Name" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="game_profile" className="col-sm-2 col-form-label">Game Profile</label>
                                <div className="col-sm-10">
                                    <select name="game_profile" value={game_profile} onChange={this.onChange} id="game_profile" className="form-control pull-left" >
                                        <option >Select Profile</option>
                                        <option value="texas_holdem">Texas Holdem</option>
                                        <option value="dealer_choice">Dealer Choice</option>
                                        <option value="omaha">Omaha</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="game_type" className="col-sm-2 col-form-label">Game Type</label>
                                <div className="col-sm-10">
                                    <select name="game_type" value={game_type} onChange={this.onChange} id="game_type" className="form-control pull-left" >
                                        <option >Select Game Type</option>
                                        <option value="cash">Cash</option>
                                        <option value="tournament">Tournament</option>
                                        <option value="cash/tournament">Cash/Tournament</option>
                                    </select>
                                </div>
                            </div>
                            {this.Tournamentfields()}
                            {this.cashfields()}
                            <div className="form-group row">
                                <label for="isPrivate" className="col-sm-2 col-form-label">Event Type</label>
                                <div className="col-sm-10">
                                    <select name="isPrivate" value={isPrivate} onChange={this.onChange} id="isPrivate" className="form-control pull-left" >
                                        <option >Select Event Type</option>
                                        <option value="0">Public</option>
                                        <option value="1">Private</option>
                                    </select>
                                </div>
                            </div>
                            {this.privatefields()}
                            <div className="form-group row">
                                <label for="game_date" className="col-sm-2 col-form-label">Date</label>
                                <div className="col-sm-10">
                                    <input type="date" className="form-control pull-left" name="game_date" value={game_date} onChange={this.onChange} id="game_date" placeholder="Please Select Date" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="Time" className="col-sm-2 col-form-label">Time</label>
                                <div className="col-sm-10">
                                    <input type="time" className="form-control pull-left" name="time" value={time} onChange={this.onChange} id="time" placeholder="Please Select Time" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label for="max_players" className="col-sm-2 col-form-label">Maximum Players</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control pull-left" name="max_players" value={max_players} onChange={this.onChange} id="max_players" placeholder="Please Enter Maximum No. of Players" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="min_players" className="col-sm-2 col-form-label">Minimum Players</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control pull-left" name="min_players" value={min_players} onChange={this.onChange} id="min_players" placeholder="Please Enter Minimum No. of Players" />
                                </div>
                            </div>

                            <div className="form-group row">
                                <label for="table_rules" className="col-sm-2 col-form-label">Table Rules</label>
                                <div className="col-sm-10">
                                    <textarea name="table_rules" id="table_rules" className="form-control pull-left" value={table_rules} onChange={this.onChange} placeholder="Please Enter Table Rules Here..." rows="4"></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="address" className="col-sm-2 col-form-label">Address</label>
                                <div className="col-sm-10">
                                    <textarea name="address" id="address" className="form-control pull-left" value={address} onChange={this.onChange} placeholder="Please Enter Address" rows="4"></textarea>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="file_1" className="col-sm-2 col-form-label">Location Image</label>
                                <div className="col-sm-10">
                                    <FileBase64
                                        multiple={true}
                                        className="form-control pull-left"
                                        onDone={this.getFiles.bind(this)}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="location" className="col-sm-2 col-form-label">Select Location</label>
                                <div className="col-sm-10">
                                    <div className="input-group">
                                        <button className="btn btn-outline-secondary" type="button" >
                                            Select Location
                                                {this.renderLocation()}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group row ">
                                <div className="col-12 text-center">
                                    <button className=" btn btn-primary" onClick={this.createEvent}>{(processing) ? "Creating..." : "Add Event"}</button>{' '}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = () => {
    return {
        createEvent: (token, params) => actionCreater.createEvent(token, params),
    };
};
export default connect(
    null,
    mapDispatchToProps
)(CreateEvent);