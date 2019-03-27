import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import * as actionCreater from "../../../Store/Actions/DashboardActions";
import { connect } from "react-redux";
import * as actions from "../../../Store/Actions/type";

class UsersPercountryChart extends Component {
    state = {
        ...this.props,
        users: "",
        country: "",
        country_code: "",
        usersPerCountry: null,
        isLoading: true
    };

    get = () => {
        this.setState({
            isLoading: true
        });

        let { get, dispatch, user, errorHandler } = this.props;

        get(user.auth.access_token)
            .then(res => {
                this.setState({
                    usersPerCountry: res.data.data,
                });
                dispatch({
                    type: actions.GET_USER_PER_COUNTRY,
                    payload: res.data.data
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
        this.get();
    }
    render() {
        if (this.state.isLoading) {
            return false;
        }
        const { usersPerCountry: m } = this.state;

        if (!m) {
            return;
        }
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 mb-4">
                <div className="card card-small">
                    <div className="card-header border-bottom">
                        <div className="row">
                            <div className="col-4">
                                <h6 className="m-0">Users Per Country</h6>
                            </div>
                            <div className="col-4  text-center">
                               
                            </div>
                            <div className="col-4 text-right" >
                                <Link className=" btn btn-outline-secondary" to={`/users_per_country`} {...this.props}>
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="card-body pt-0">

                        <Bar
                            data={{
                                // labels:m.map(e => <img src={`https://www.countryflags.io/${e.country_code}/shiny/64.png`} width="31px" height="25px" alt="tk" />) ,
                                labels: m.map(e => e.country),
                                datasets: [
                                    {
                                        label: 'Total User',
                                        data: m.map(e => (e.users ? e.users : 0)),
                                        backgroundColor: '#674eec',
                                        borderColor: '#33dd66',
                                        animation: true,
                                    }
                                ]
                            }}
                            options={{ maintainAspectRatio: false }}
                        />
                    </div>
                </div>
            </div >
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
        get: (token) => actionCreater.getCountryUsers(token),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UsersPercountryChart);