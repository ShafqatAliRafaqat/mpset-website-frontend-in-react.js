import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import SimplePagination from "../Common/SimplePagination";
import * as actionCreater from "../../Store/Actions/UserActions";
import LocationImages from "./LocationImages";
import EventTable from "../Event/EventTable";
import LocationModal from "../Common/Location/LocationModal";

class UserDetail extends Component {
    initState = {

        avatar: "",
        user: null,
        processing: false,
        isOpen: false,
    };

    state = {
        ...this.initState
    };

    userDetail = (id) => {

        this.setState({
            isLoading: true
        });

        let { userDetail, user, errorHandler } = this.props;

        userDetail(user.auth.access_token, id).then(res => {

            let user = res.data.data;
            user.events = res.data.meta.events;

            this.setState({
                user
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
        this.userDetail(params.id);
    };

    renderUserDetails = () => {

        const { user: m } = this.state;

        if (!m) {
            return;
        }

        return (
            <div className="row event-details" key={m.id}>
                <div className="container-fluid">
                    <div className="row mt-3">
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">First Name</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.first_name}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Last Name</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.last_name}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Nick Name</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.nick_name}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-1 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Gender</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.gender}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Email</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.email}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Phone</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{m.phone}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Balance</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">$505</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col cb mb-5">
                            <div className="card card-small cr cr-2 text-center">
                                <div className="card-header  border-bottom">
                                    <h6 className="m-0">Notification</h6>
                                </div>
                                <div className="card-body py-0">
                                    <h6 className="text-center">{(m.notification_status) ? "On" : "Off"}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    renderEventTable = (isHead = true, model = null) => {

        const { user } = this.state;

        if (user) {

            return <EventTable events={user.events} />
        }
    }
    renderLocationImages = (isHead = true, model = null) => {

        const { location } = this.state.user;

        if (location) {
            const images = location.images.map(image => image.path)
            return <LocationImages images={images} />
        }
    }
    renderLocation = (isHead = true, model = null) => {

        const { location } = this.state.user;

        if (location) {
            const lat = parseInt(location.lat);
            const lng = parseInt(location.lng);
            return <LocationModal onLocationChange={()=>{}} style={{width:'85%',height:'90%'}} modalStyle={{  width:'100%',height:'400px'}}  location={{ lat, lng }} />
        }
    }


    render() {
        const { user: m } = this.state;

        if (!m) {
            return false;
        }
        return (
            <div className="main-content-container container-fluid px-4">
                {/* <!-- Page Header --> */}
                <div className="page-header row no-gutters py-4">
                    <div className="col-lg-12 col-sm-4 text-center text-sm-left mb-0">
                        <h4 className="page-title black d-inline">{m.first_name} {m.last_name} Details</h4>
                        <p className="d-inline black loc-p ml-2">
                            {m.address}
                            {this.renderLocation()}
                            {this.renderLocationImages()}
                        </p>
                    </div>
                </div>
                
                {/* <!-- End Page Header -->  */}
                {/* <!-- / Start Main Content --> */}

                {this.renderUserDetails()}
                <div className="page-header row no-gutters py-4">
                    <div className="col-lg-12 col-sm-4 text-center text-sm-left mb-0">
                        <h4 className="page-title black d-inline">User Events history</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mb-4">
                        <div className="table-responsive custom-tables">
                            {this.renderEventTable()}
                            <SimplePagination next={this.next} previous={this.previous} />
                        </div>
                    </div>
                </div>
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
        userDetail: (token, id) => actionCreater.userDetail(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserDetail);