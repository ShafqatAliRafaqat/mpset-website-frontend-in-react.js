import React, { Component } from "react";
import { connect } from "react-redux";
import EditUser from "./EditUser";
import * as actionCreater from "../../Store/Actions/UserActions";

class UserProfile extends Component {
  initState = {
    avatar: "",
    user: this.props.user,
    processing: false,
    isOpen: false
  };

  state = {
    ...this.initState
  };

  render() {
    const { user: m } = this.state;

    if (!m) {
      return false;
    }

    return (
      <div className="main-content-container container-fluid px-4">
        {/* <!-- Page Header --> */}
        <div className="page-header row no-gutters py-4">
          <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
            <h3 className="page-title">{m.first_name} Profile</h3>
          </div>
        </div>
        {/* <!-- End Page Header -->  */}
        {/* <!-- / Start Main Content --> */}

        <div className="row">
          <div className="col-lg-12">
            <div className="card card-small mb-4">
              <div className="card-header border-bottom">
                <h6
                  className="m-0 d-inline-block float-left"
                  style={{ textTransform: "capitalize" }}
                >
                  {m.nick_name} Account Details
                </h6>
                <EditUser {...this.props} userData={m} OnUserChange={cbUser => { this.setState({user:cbUser}) }}>
                  <button className="btn btn-primary float-right d-inline-block ">
                    <i className="fa fa-edit mr-3" />
                    Edit
                  </button>
                </EditUser>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item p-3">
                  <div className="row">
                    <div className="col">
                      <form>
                        <div className="form-row">
                          <div className="col-md-4 mb-3 mx-auto">
                            <img
                              className="rounded-circle img-fluid"
                              src={m.avatar}
                              alt="User Avatar"
                              width="auto"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="row">
                              <div className="form-group col-md-6">
                                <label className="pb-1"  for="feFirstName">First Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="feFirstName"
                                  placeholder="First Name"
                                  value={m.first_name}
                                  
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label className="pb-1"  for="feLastName">Last Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="feLastName"
                                  placeholder="Last Name"
                                  value={m.last_name}
                                />
                              </div>

                              <div className="form-group col-md-6">
                                <label className="pb-1"  for="feNickName">Nick Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="feNickName"
                                  placeholder="Nick Name"
                                  value={m.nick_name}
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label className="pb-1"  for="feEmailAddress">Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="feEmailAddress"
                                  placeholder="Email"
                                  value={m.email}
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label className="pb-1"  for="fePhone">Phone</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="fePhone"
                                  placeholder="Phone"
                                  value={m.phone}
                                />
                              </div>
                              <div className="form-group col-md-6">
                                <label className="pb-1"  for="feGender">Gender</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="feGender"
                                  placeholder="Gender"
                                  value={m.gender}
                                />
                              </div>
                              
                              <div className="form-group col-md-12">
                                <label className="pb-1"  for="feAddress">Address</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="feAddress"
                                  placeholder="Notification Status"
                                  value={m.address}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    metaData: state.MetaDataReducer
  };
};

const mapDispatchToProps = () => {
  return {
    userDetail: (token, id) => actionCreater.userDetail(token, id)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
