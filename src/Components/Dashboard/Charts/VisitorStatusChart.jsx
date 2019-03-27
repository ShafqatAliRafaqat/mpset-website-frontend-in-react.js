import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import * as actionCreater from "../../../Store/Actions/UserGrowthActions";
import { connect } from "react-redux";
import * as qs from 'query-string';
import * as actions from "../../../Store/Actions/type";
import { getSearchUrlFromState } from '../../../util/functions'

import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';

class VisitorStatusChart extends Component {

    state = {
        ...this.props,
        users: "",
        monthYear: "",
        userGrowth: null,
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
                    userGrowth: res.data,
                });
                dispatch({
                    type: actions.GET_USER_GROWTH,
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

        params = { ...params}
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

    renderTable() {

        const { userGrowth } = this.state;

        if (!userGrowth) {
            return;
        }
        return (

            <Line
                data={{
                    labels: userGrowth.map(e => e.monthYear),
                    datasets: [
                        {
                            label: "Users",
                            data: userGrowth.map(e => (e.users ? e.users : 0)),
                            backgroundColor: '#da542e',
                            borderColor: '#33dd66',
                            animation: true,
                        }
                    ]
                }}
                options={{ maintainAspectRatio: false }}
            />
        );
    }
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
        const { start, end, ranges } = this.state;
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
                <div className="card card-small">
                    <div className="card-header border-bottom">
                        <div className="row">
                            <div className="col-4">
                                <h6 className="m-0">Users Growth</h6>
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
                        {this.renderTable()}
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
        get: (token, search) => actionCreater.getUserGrowth(token, search),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VisitorStatusChart);
