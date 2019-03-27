import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionsCreators from "../../Store/Actions/AuthActions"

class LostPassword extends Component {
  
    render() {

        return (
            <div className="container">
                <div className="outer-box">
                    <div className="logo-image"> <img src="/assets/images/Logo.png" width="239" height="90" alt="" /> </div>
                    <div className="inner-box">
                        <div className="inner-padding">
                            <form id="recoverform">
                                <div className="form-group">
                                    <div className="heading-label text-center">
                                        <h3>Lost Password?</h3>
                                    </div>
                                    <p className="text-center">Enter your email address below and we will send you  instructions how to recover your password</p>
                                </div>
                                <div className="form-group">
                                    <input type="email"  onClick={this.login} className="input-rounded form-control" id="inputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" required />
                                </div>
                                <button type="submit" className="input-rounded btn btn-primary">Submit</button>
                                <div className="form-group">
                                    <div className="input-label text-center">
                                        <Link to={'/login'}><i className="fas fa-arrow-left"></i> back to login</Link>
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
)(LostPassword);
