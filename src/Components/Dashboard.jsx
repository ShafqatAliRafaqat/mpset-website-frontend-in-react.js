import React, { Component } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as dashboardActionCreater from "../Store/Actions/DashboardActions";
import * as actions from "../Store/Actions/type";
import BlockFreaturesBody from "./BlockFeatures/BlockFreaturesBody";
import PrivatePublicEventChart from "./Dashboard/Charts/PrivatePublicEventChart";
import EventStatusChart from "./Dashboard/Charts/EventStatusChart";
import VisitorStatusChart from "./Dashboard/Charts/VisitorStatusChart";
import FeedBack from "./Dashboard/FeedBack";
import UsersPercountryChart from "./Dashboard/Charts/UsersPercountryChart";

class Dashboard extends Component {
    state = {
        // ...this.props,
        country_code: "",
        country: "",
        features: "",
        all_features: "",
        page: 0,
        totalPages: 0,
        isLoading: true
    };

    get = () => {
        this.setState({
            isLoading: true
        });
        let { get, dispatch, user, errorHandler } = this.props;

        get(user.auth.access_token)
            .then(res => {

                dispatch({
                    type: actions.GET_DASHBOARD,
                    payload: res.data.data
                });
                this.setState({
                    dashboardData: res.data.data,
                });
            })
            .catch(errorHandler).finally(() => {
                this.setState({
                    isLoading: false
                });
            });
    };

    componentDidMount() {
        this.get();
    }



    render() {
        if (this.state.isLoading) {
            return false;
        }
        const { dashboardData: m } = this.state;
       
        if(!m){
            return false;
        }
        return (
            <div className="main-content-container container-fluid px-4">
                {/* / Start Main Content */}
                <div className="row my-4">
                    <div className="col-lg-7">
                        <div className="card counters">
                            <div className="card-body text-center">
                                <div className="row align-items-center flex-row my-4">
                                    <div className="col-lg-4">
                                        <p className="mb-2  align-items-center"><img src="/assets/images/icons/totaluser.png" alt="Total Users" /></p>
                                        <p className="mb-2 text-capitalize" style={{ fontSize: '.8rem', color: '#000' }}>Total Users</p>
                                        <p className="mb-0" style={{ fontSize: '1.5rem', cossslor: '#000;' }}>{m.allUsers}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="mb-2  align-items-center"><img src="/assets/images/icons/totalevents.png" alt="Total Events" /></p>
                                        <p className="mb-2 text-capitalize" style={{ fontsize: '.8rem', color: '#000' }}>Total Events</p>
                                        <p className="mb-0" style={{ fontSize: '1.5rem', color: '#000' }}>{m.allEvents}</p>
                                    </div>
                                    <div className="col-lg-4">
                                        <p className="mb-2  align-items-center"><img src="/assets/images/icons/ongoingevents.png" alt="Total OngingEvents" /></p>
                                        <p className="mb-2 text-capitalize" style={{ fontSize: '.8rem', color: '#000' }}>Ongoing Events</p>
                                        <p className="mb-0" style={{ fontSize: '1.5rem', color: '#000' }}>{m.onGoingEvents}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="row">

                            <div className="col-lg-4 mb-3 mb-lg-0 pl-lg-0">
                                <Link to={`/notificaton/create`} className="add-new-link">
                                    <div className="card add-new-box add-new-user">
                                        <div className="card-body add-new-user">
                                            <div className="row align-items-center flex-row">
                                                <div className="col-lg-12 text-center">
                                                    <p className="mb-3 align-items-center"><img src="/assets/images/icons/addbtn.png" alt="Add Notification"/></p>
                                                    <p className="pt-3 mb-0" style={{ fontSize: '1rem', color: '#000' }}>Add Notification</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className="col-lg-4 mb-3 mb-lg-0 pl-lg-0">
                                <Link to={`/user/create`} className="add-new-link">
                                    <div className="card add-new-box add-new-user">
                                        <div className="card-body add-new-user">
                                            <div className="row align-items-center flex-row">
                                                <div className="col-lg-12 text-center">
                                                    <p className="mb-3 align-items-center"><img src="/assets/images/icons/addbtn.png" alt="Add Users" /></p>
                                                    <p className="pt-3 mb-0" style={{ fontSize: '1rem', color: '#000' }}>Add New User</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 mb-3 mb-lg-0 pl-lg-0">
                                <Link to={`/event/create`} className="add-new-link">
                                    <div className="card add-new-box add-new-event">
                                        <div className="card-body add-new-event">
                                            <div className="row align-items-center flex-row">
                                                <div className="col-lg-12 text-center">
                                                    <p className="mb-3 align-items-center"><img src="assets/images/icons/addevent.png"  alt="Add Events"/></p>
                                                    <p className="pt-3 mb-0" style={{ fontSize: '1rem', color: '#000' }}>Add New Event</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {/* Events Stats */}
                    <EventStatusChart {...this.props} />

                    <PrivatePublicEventChart  {...this.props} m={m} />
                    {/* End Users By Device Stats */}

                    <div className="col-lg-8 col-md-12 col-sm-12 mb-4">
                        <div className="card card-small h-100">
                            <div className="card-header border-bottom">
                                <div className="row">
                                    <div className="col-6">
                                        <h6 className="m-0">Top Block Listed Countries</h6>
                                    </div>
                                    <div className="col-6 text-right" >
                                        <Link className=" btn btn-outline-secondary" to={`/blockfeatures`}>
                                            Details
                                </Link>
                                    </div>
                                </div>

                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover text-center">
                                    <thead>
                                        <tr>
                                            <th className="border-top-0">Flag</th>
                                            <th className="border-top-0">Name</th>
                                            <th className="border-top-0">Blocked Features</th>
                                            <th className="border-top-0">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <BlockFreaturesBody {...this.props} />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <FeedBack  {...this.props} />
                    <UsersPercountryChart {...this.props}/>
                    <VisitorStatusChart {...this.props} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user,
        blockfeatures: state.BlockFeatureReducer.blockfeatures,
        metaData: state.MetaDataReducer
    };
};
const mapDispatchToProps = () => {
    return {
        get: (token) => dashboardActionCreater.getDashboard(token),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

