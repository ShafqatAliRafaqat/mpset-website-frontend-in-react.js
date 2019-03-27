import React, { Component } from "react";
import DeleteModal from "../Common/Modals/DeleteModal";
import { connect } from "react-redux";
import EditEvent from "./EditEvent";
import * as actions from "../../Store/Actions/type";
import * as actionCreater from "../../Store/Actions/EventActions";
import { getSearchUrlFromState } from '../../util/functions';


import { Link } from "react-router-dom";

class EventTable extends Component {
    initState = {

        ...this.props,
        processing: false,
        isOpen: false,
    };

    state = {
        ...this.initState
    };

    renderEdit = (isHead = true, model = null) => {
        return <EditEvent {...this.props}  eventData={model} />
    }

    renderBody = () => {

        if (this.state.isLoading) {
            return;
        }
        const { events } = this.props;
        console.log(events);
        return events.map(m => {

            return (
                <tr>
                    <td>{m.name}</td>
                    <td>{m.host_name}</td>
                    <td>{m.PublicStatus}</td>

                    <td>{m.date}</td>
                    <td>{m.time}</td>
                    <td>{m.duration}</td>
                    <td>{m.status}</td>
                    <td>
                        <Link to={`/event/detail?id=${m.id}`} {...this.props} style={{ display: 'inline' }}>View Details</Link>
                        <div className="px-2 mx-1" data-toggle="dropdown" style={{ display: 'inline', cursor: 'pointer' }} aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"> </i>
                        </div>
                        <span className="dropdown-menu">
                            <div className="main-content-container container-fluid px-4">

                                {this.renderEdit(false, m)}
                                <div className="dropdown-divider"></div>
                                <DeleteModal delete={() => this.deleteEvent(m.id)} />
                            </div>

                        </span>
                    </td>
                </tr>
            );
        });
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

    deleteEvent(id) {

        let { user, deleteEvent, dispatch, alertify, errorHandler } = this.props;

        deleteEvent(user.auth.access_token, id).then(res => {
            dispatch({
                type: actions.DELETE_EVENT,
                payload: id
            });
            alertify.success(res.data.message);
        }).catch(errorHandler);
    }

    render() {
        return (
            <table className="table table-hover table-rounded table-events">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Host Name</th>
                        <th>Event Type</th>

                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th><i className="fas fa-list mr-2"></i>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderBody()}
                </tbody>
            </table>

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
        get: (token, search) => actionCreater.getEvents(token, search),
        deleteEvent: (token, id) => actionCreater.deleteEvent(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventTable);