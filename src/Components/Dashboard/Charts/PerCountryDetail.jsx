import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreater from "../../../Store/Actions/DashboardActions";
import * as actions from "../../../Store/Actions/type";

class PerCountryDetail extends Component {
    state = {
        ...this.props.m,
        country_code: "",
        country: "",
        users: "",

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
    renderTable = () => {
        if (this.state.isLoading) {
            return false;
        }
        const { usersPerCountry: m } = this.state;

        if (!m) {
            return;
        }
        return m.map(e => {
            return (
                <tr>
                    <td>
                        <img src={`https://www.countryflags.io/${e.country_code}/shiny/64.png`} width="31px" height="25px" alt="tk" />
                    </td>
                    <td>
                        {e.country}
                    </td>
                    <td>
                        <span className="label label-success label-rounded" style={{ margin: "0 1px" }}>{e.users}</span>
                    </td>
                </tr>

            );
        });
    }
    render() {
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="page-header row no-gutters py-4">
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h4 className="page-title black">Users Per Country</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mb-4">
                        <div className="card card-small crt cr-3">
                            <div className="card-header border-bottom" style={{ backgroundColor: '#674eec' }}>
                                <h6 className="m-0 d-inline-block float-left">Countries</h6>
                                {/* <h6 className="m-0 d-inline-block float-right">
                                        {this.renderAddFeatureButton()}
                                    </h6> */}
                            </div>
                            <div className="card-body py-0">
                                <div className="table-responsive">
                                    <table className="table table-hover text-center block-countries">
                                        <thead>
                                            <tr>
                                                <th className="border-top-0">Flag</th>
                                                <th className="border-top-0">Name</th>
                                                <th className="border-top-0">No Of Players</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderTable()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
        get: (token) => actionCreater.getCountryUsers(token),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PerCountryDetail);