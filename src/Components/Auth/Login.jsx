import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/type";
import * as actionsCreators from "../../Store/Actions/AuthActions";
import alertify from 'alertifyjs';
import { errorHandler } from '../../util/functions';

class Login extends Component {
    state = {
        email: "",
        password: "",
        error: "",
        inProgress: false,
    };

    componentWillMount() {
        if (this.props.user) {
            this.props.history.push("/");
        }
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    globalErrorHandler = (error) => {
        const {dispatch} = this.props;
        errorHandler(error,dispatch,alertify);
    }

    login = () => {

        let { login, dispatch, history } = this.props;

        this.setState({
            inProgress: true
        });

        const { email, password } = this.state;

        const params = { email, password };

        login(params).then(res => {

            dispatch({
                type: actions.LOGIN,
                payload: res.data
            });

            history.push("/");

        }).catch(this.globalErrorHandler).finally(() => {
            this.setState({
                inProgress: false
            });
        });
    };

    render() {

        const { email, inProgress, password } = this.state;
        return (
            <div className="container">
                <div className="outer-box">
                    <div className="logo-image"> <img src="/assets/images/Logo.png" width="239" height="90" alt="" /> </div>
                    <div className="inner-box">
                        <div className="inner-padding">
                            <form id="loginform">
                                <div className="form-group">
                                    <label className="input-label" for="inputEmail1">Email</label>
                                    <input type="email" className="input-rounded form-control" name="email" id="inputEmail1"
                                        onChange={this.onChange} value={email} aria-describedby="emailHelp" placeholder="Enter Email" required />
                                </div>
                                <div className="form-group">
                                    <label className="input-label" for="inputPassword">Password</label>
                                    <input type="password" className="input-rounded form-control" id="inputPassword" name="password"
                                        onChange={this.onChange} value={password} placeholder="Enter Password" required minlength="6" />
                                </div>
                                <button type="button" value={(inProgress) ? "Please wait..." : "Login"} disabled={inProgress} onClick={this.login} className="input-rounded btn btn-primary">Submit</button>
                                <div className="form-group">
                                    <div className="input-label text-center">
                                        <Link to={'/lostpassword'}>Lost Password?</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <p className="clear"> </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch,
        login: data => actionsCreators.login(data)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);