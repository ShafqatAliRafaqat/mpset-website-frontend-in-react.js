import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import StarRatingComponent from 'react-star-rating-component';
import * as actionCreater from "../../Store/Actions/EventActions";
import LocationImages from "../User/LocationImages";
import LocationModal from "../Common/Location/LocationModal";

class EventDetail extends Component {

    initState = {
        ...this.props,
        event: null,
        processing: false,
        isOpen: false,
    };

    state = {
        ...this.initState
    };

    eventDetail = (id) => {

        this.setState({
            isLoading: true
        });

        let { eventDetail, user, errorHandler } = this.props;

        eventDetail(user.auth.access_token, id).then(res => {

            let event = res.data.data;
            // event.users = res.data.meta.users;

            this.setState({
                event
            });

        }).catch(errorHandler).finally(() => {
            this.setState({
                isLoading: false
            });
        });
    };


    componentWillMount() {
        let search = this.props.location.search;
        const params = qs.parse(search);
        this.eventDetail(params.id);
    };

    renderEventUsers = (isHead = true, model = null) => {

        const { event } = this.state;
        const users = event.users;
        
        if (!users) {
            return;
        }

        return users.map(m => {

            return (
                <tr key={m.id}>
                    <td>{m.first_name}{(m.id === event.host.id) ? <small class="host-badge"><span class="mt-0 pt-0 label label-rounded label-success">host</span></small> : <small class="player-badge"><span class="mt-0 pt-0 label label-rounded label-megna">player</span></small>}</td>
                    <td>{m.pivot.buyins}</td>
                    <td>${m.pivot.checkout}</td>
                    <td>$505</td>
                    <td>
                        <StarRatingComponent
                            name="rate"
                            editing={false}
                            renderStarIcon={() => <i className="fas fa-star"></i>}
                            starCount={5}
                            value={m.rating}
                        />

                    </td>
                    <td>
                        {(m.pivot.isApproved) ? <span className="label label-rounded label-success">Approved</span> : <span class="label label-rounded label-primary">Pending</span>}

                    </td>
                </tr>
            );
        });
    }
    renderEventDetails = () => {

        const { event: m } = this.state;
        if (!m) {
            return;
        }
        return (
            <div className="row event-details">
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Host Name</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.host_name}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Event Status</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.status}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Event Type</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.PublicStatus}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Game Type</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.game_type_string}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Game Profile</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.game_profile_string}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Purchase Amount</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">${m.purchase_amount}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Game Date</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.date}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Game Time</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.time}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">No. of Players</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.no_of_players}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Minimum Players</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.min_players}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Maximum Players</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.max_players}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Minimum Buy In's</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.min_buyins}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Maximum Buy In's</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.max_buyins}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Rebuy In's</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.re_buyins}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Small Blind</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">${m.small_blind}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Big Blind</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">${m.big_blind}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 mb-4">
                            <div className="card card-small crt cr-3 text-center">
                                <div className="card-header border-bottom">
                                    <h6 className="m-0">Players Stats</h6>
                                </div>
                                <div className="card-body py-0">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Player Name</th>
                                                    <th>Biy In's</th>
                                                    <th>Checkout</th>
                                                    <th>Balance</th>
                                                    <th>Players rating</th>
                                                    <th>Approval Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.renderEventUsers()}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 mb-4">
                            <div className="card card-small crt cr-3 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Table Rules</h6>
                                </div>
                                <div className="card-body py-2">
                                    <p className="text-left p-2 m-0">
                                        {m.table_rules}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    renderLocationImages = (isHead = true, model = null) => {

        const { location } = this.state.event;

        if (location) {
            const images = location.images.map(image => image.path)
            return <LocationImages images={images} />
        }
    }
    renderLocation = (isHead = true, model = null) => {

        const { location } = this.state.event;

        if (location) {
            const lat = parseInt(location.lat);
            const lng = parseInt(location.lng);
            return <LocationModal onLocationChange={() => { }} style={{ width: '85%', height: '90%' }} modalStyle={{ width: '100%', height: '400px' }} location={{ lat, lng }} />
        }
    }


    render() {
        const { event: m } = this.state;

        if (!m) {
            return false;
        }
        return (
            <div className="main-content-container container-fluid px-4">
                {/* <!-- Page Header --> */}
                <div className="header-left">
                    <div className="page-header row no-gutters py-4 pull-left">
                        <div className="text-center text-sm-left mb-0">
                            <h4 className="page-title black d-inline">{m.name} Details</h4>
                            <p className="d-inline black loc-p ml-2">
                                {m.address} 
                                {this.renderLocation()}
                                {this.renderLocationImages()}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <div className="page-header row no-gutters py-4">
                        <div className="text-center text-sm-left mb-0">
                            <h6 class="page-title black d-inline">Event Rating </h6>
                            <p className="d-inline black ml-2">
                                <StarRatingComponent
                                    name="rate"
                                    editing={false}
                                    renderStarIcon={() => <i className="fas fa-star"></i>}
                                    starCount={5}
                                    value={m.rating}
                                />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="clearfix"></div>
                {this.renderEventDetails()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        eventDetail: (token, id) => actionCreater.eventDetail(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventDetail);
