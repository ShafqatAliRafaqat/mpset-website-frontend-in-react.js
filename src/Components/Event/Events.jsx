import React, { Component } from "react";

import { connect } from "react-redux";
import * as qs from 'query-string';
import EventTable from "./EventTable";
import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/type";
import * as actionCreater from "../../Store/Actions/EventActions";
import {  getSearchUrlFromState } from '../../util/functions'


class Events extends Component {
    state = {
        name: "",
        status: "",
        game_type_string: "",
        PublicStatus: "",
        date_string: "",
        date: "",
        time: "",
        duration: "",
        rating: "",
        address: "",
        host_name: "",
        PlayerStatus: "",
        no_of_players: "",

        page: 0,
        totalPages: 0,
        isLoading: true
    };
    get = (search) => {

        this.setState({
            isLoading: true
        });
        let { get, dispatch, user, errorHandler } = this.props;

        get(user.auth.access_token, search).then(res => {

            this.setState({
                page: res.data.meta.current_page,
                totalPages: res.data.meta.last_page,
            });

            dispatch({
                type: actions.GET_EVENTS,
                payload: res.data.data
            });

        }).catch(errorHandler).finally(() => {
            this.setState({
                isLoading: false
            });
        });
    };
    componentDidMount() {

        let search = this.props.location.search;

        const params = qs.parse(search);

        for (let key in params) {
            this.setState({
                [key]: params[key]
            });
        }

        this.get(search);
    }
    next = () => {
        let next = this.state.page + 1;
        if (next <= this.state.totalPages) {
            let search = getSearchUrlFromState(this.state);
            this.get(search + "page=" + next);
        }
    };

    previous = () => {
        let previous = this.state.page - 1;
        if (previous > 0) {
            let search = getSearchUrlFromState(this.state);
            this.get(search + "page=" + previous);
        }
    };
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    filter = () => {
        let search = getSearchUrlFromState(this.state);
        this.get(search);
    };
    renderEventTable = (isHead = true, model = null) => {
        
        return <EventTable {...this.props} userEvent={model} />
    }

    render() {
        return (
            <div className="main-content-container container-fluid px-4">
                {/* <!-- Page Header --> */}
                <div className="page-header row no-gutters py-4">
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h4 className="page-title black">Displaying Events List</h4>
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
        events: state.EventReducer.events,
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actionCreater.getEvents(token, search),
        deleteEvent: (token, id) => actionCreater.deleteEvent(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Events);