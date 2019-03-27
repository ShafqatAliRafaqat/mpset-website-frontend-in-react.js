import React, { Component } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import AdminSideMenu from "./AdminSideMenu";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import { connect } from "react-redux";
import { errorHandler } from '../../util/functions';
import alertify from "alertifyjs";
import routes from "../../routes";
import * as actions from "../../Store/Actions/type";
import * as actionsCreators from "../../Store/Actions/MetaDataActions";


alertify.set('notifier', 'position', 'top-right');


class AdminLayout extends Component {

    isAuthenticated = () => {
        return this.props.user !== null;
    };

    componentDidMount() {

        let { fetchMetaData, dispatch, user } = this.props;


        fetchMetaData(user.auth.access_token).then(res => {

            dispatch({
                type: actions.GET_META_DATA,
                payload: res.data.data
            });

        }).catch(this.globalErrorHandler);
    }

    globalErrorHandler = (error) => {
        const { dispatch } = this.props;

        errorHandler(error, dispatch, alertify);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <AdminSideMenu />
                    <main className="main-content col-lg-10 col-md-9 col-sm-12 p-0 offset-lg-2 offset-md-3">
                        <AdminHeader {...this.props} />
                        <Switch>

                            {routes.map((route, idx) => {
                                return route.Component ? (
                                    <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => {

                                        if (this.isAuthenticated()) {

                                            return <route.Component alertify={alertify} ability={this.ability} {...props} {...this.props} errorHandler={this.globalErrorHandler} />
                                        }
                                        return <Redirect to='/login' />;
                                    }}
                                    />
                                )
                                    : (null);
                            },
                            )}
                            <Redirect from="/" to="/dashboard" />

                        </Switch>
                        <AdminFooter />
                    </main>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        fetchMetaData: token => actionsCreators.getMetaData(token)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminLayout);