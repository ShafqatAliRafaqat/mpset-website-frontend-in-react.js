import React, { Component } from 'react';
import * as actionCreater from "../../../Store/Actions/DashboardActions";
import { connect } from "react-redux";
import { Line } from 'react-chartjs-2';
import * as qs from 'query-string';
import * as actions from "../../../Store/Actions/type";
import { getSearchUrlFromState } from '../../../util/functions'

import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

class EventStatusChart extends Component {

    state = {
        ...this.props,
        events: "",
        monthYear: "",
        eventStats: null,
        start_date: "",
        end_date: "",
        start: moment().startOf('year').format('MM-DD-YYYY'),
        end: moment().startOf('year').format('MM-DD-YYYY'),
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
        },
        isLoading: true
    };
    get = (search) => {
        this.setState({
            isLoading: true
        });

        let { get, dispatch, user, errorHandler } = this.props;

        get(user.auth.access_token, search)
            .then(res => {
                this.setState({
                    eventStats: res.data,
                });
                dispatch({
                    type: actions.GET_EVENT_STATS,
                    payload: res.data
                });
            })
            .catch(errorHandler)
            .finally(() => {
                this.setState({
                    isLoading: false
                });
            });
    };

    componentDidMount() {

        let search = this.props.location.search;
        let params = qs.parse(search);

        params = { ...params }
        search = getSearchUrlFromState(params);

        for (let key in params) {
            this.setState({
                [key]: params[key]
            });
        }
        this.get(search);
    }

    filter = () => {
        let search = getSearchUrlFromState(this.state);
        this.get(search);
    };

    handleApply = (event, picker) => {

        const start_date = picker.startDate.format('YYYY-MM-DD');
        const end_date = picker.endDate.format('YYYY-MM-DD');

        this.setState({
            start_date,
            end_date
        });

        this.get(`?start_date=${start_date}&end_date=${end_date}`);

    }

    render() {
        const { eventStats, start, end, ranges } = this.state;

        if (!eventStats) {
            return false;
        }
        return (
            <div className="col-lg-8 col-md-12 col-sm-12 mb-4">
                <div className="card card-small">
                    <div className="card-header border-bottom">
                        <div className="row">
                            <div className="col-4">
                                <h6 className="m-0">Events Stats</h6>
                            </div>
                            <div className="col-4  text-center">
                            </div>
                            <div className="col-4 text-right" >
                                <DateRangePicker
                                    showDropdowns
                                    autoApply
                                    startDate={start}
                                    endDate={end}
                                    ranges={ranges}
                                    onApply={this.handleApply}
                                >
                                    <button className=" btn btn-outline-secondary selected-date-range-btn">
                                        <i className="fa fa-calendar" />
                                        &nbsp; &nbsp;
                                            <span>
                                            Pick Date
                                            </span>
                                        &nbsp; &nbsp;
                                        <i className="fa fa-angle-down" />
                                    </button>
                                </DateRangePicker>
                            </div>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <Line
                            data={{
                                labels: eventStats.map(e => e.monthYear),
                                datasets: [
                                    {
                                        label: "Events",
                                        data: eventStats.map(e => (e.events ? e.events : 0)),
                                        backgroundColor: '#da542e',
                                        borderColor: '#33dd66',
                                        animation: true,
                                    }
                                ]
                            }}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = () => {
    return {
        get: (token, search) => actionCreater.getEventStats(token, search),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(EventStatusChart);