import React, { Component } from "react";
import * as actions from "../../Store/Actions/type";
import * as actionsCreators from "../../Store/Actions/AuthActions"
import { connect } from "react-redux";

class Logout extends Component {

  componentDidMount() {
    
    // Assigned but not used.
    // let token = this.props.user.accessToken;

    this.props.dispatch({
      type: actions.LOGOUT
    });

    // this.props.logout(token).then(res => {
      
    //   this.props.dispatch({
    //     type: actions.LOGOUT
    //   });

    //   this.props.history.push("/login");
    // }).catch(this.props.errorHandler);
    
  }

  render() {
    return <p>Please wait...</p>;
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
    logout: token => actionsCreators.logout(token)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
