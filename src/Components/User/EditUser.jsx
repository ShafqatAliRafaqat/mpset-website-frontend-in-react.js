import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../Store/Actions/type";
import FileBase64 from 'react-file-base64';
import * as actionCreater from "../../Store/Actions/UserActions";
import {
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal
} from "reactstrap";

class EditUser extends Component {
  initState = {
    ...this.props.userData,
    password: "",
    files: [],
    avatar: null,
    processing: false,
    isOpen: false
  };

  state = {
    ...this.initState
  };
  getFiles(files) {
    this.setState({ file_1: files })
  }
  editUser = () => {
    this.setState({
      processing: true
    });

    let {
      editUser,
      dispatch,
      alertify,
      user,
      errorHandler,
      OnUserChange
    } = this.props;

    let {
      id,
      first_name,
      last_name,
      nick_name,
      email,
      password,
      address,
      phone,
      gender,
      file_1
    } = this.state;

    let avatar = (file_1) ? file_1.base64 : "";
    const params = {
      first_name, last_name, nick_name, email, password, address,
      phone, gender, avatar,
    };
    editUser(user.auth.access_token, id, params)
      .then(res => {

        const userData = res.data.data

        dispatch({
          type: actions.EDIT_USER,
          payload: userData
        });

        dispatch({
          type: actions.EDIT_USER_PROFILE,
          payload: userData
        });

        if (OnUserChange) {
          OnUserChange(userData);
        }

        this.setState({
          isOpen: false
        });

        alertify.success(res.data.message);
      })
      .catch(errorHandler)
      .finally(() => {
        this.setState({
          processing: false
        });
      });
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.avatar ? e.target.avatar[0] : e.target.value
    });
  };

  render() {
    let {
      first_name,
      last_name,
      nick_name,
      email,
      password,
      address,
      phone,
      gender,
      avatar,
      isOpen,
      processing
    } = this.state;

    const { children } = this.props;

    return (
      <div className="main-content-container container-fluid px-4">
        <div onClick={this.toggle}>{children}</div>

        <Modal
          isOpen={isOpen}
          toggle={this.toggle}
          className="modal-lg modal-primary"
        >
          <ModalHeader toggle={this.toggle}> Edit User</ModalHeader>

          <ModalBody>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-features">
                  <div className="form-group row">
                    <label for="first-name" className="col-sm-3 col-form-label">
                      First Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control pull-left"
                        name="first_name"
                        value={first_name}
                        onChange={this.onChange}
                        id="first-name"
                        placeholder="Please Enter User First Name"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="last-name" className="col-sm-3 col-form-label">
                      Last Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control pull-left"
                        name="last_name"
                        value={last_name}
                        onChange={this.onChange}
                        id="last-name"
                        placeholder="Please Enter User Last Name"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="nick-name" className="col-sm-3 col-form-label">
                      Nick Name
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control pull-left"
                        name="nick_name"
                        value={nick_name}
                        onChange={this.onChange}
                        id="nick-name"
                        placeholder="Please Enter User Nick Name"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="gender" className="col-sm-3 col-form-label">
                      Gender
                    </label>
                    <div className="col-sm-9">
                      <select
                        name="gender"
                        value={gender}
                        onChange={this.onChange}
                        id="gender"
                        className="form-control pull-left"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="email" className="col-sm-3 col-form-label">
                      Email
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="email"
                        className="form-control pull-left"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        id="email"
                        placeholder="Please Enter User Email Address"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="password" className="col-sm-3 col-form-label">
                      Password
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="password"
                        className="form-control pull-left"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        id="password"
                        placeholder="Please Enter User New Password"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="phone" className="col-sm-3 col-form-label">
                      Phone
                    </label>
                    <div className="col-sm-9">
                      <input
                        type="text"
                        className="form-control pull-left"
                        name="phone"
                        value={phone}
                        onChange={this.onChange}
                        id="phone"
                        placeholder="Please Enter User Phone Number"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="address" className="col-sm-3 col-form-label">
                      address
                    </label>
                    <div className="col-sm-9">
                      <textarea
                        name="address"
                        id="address"
                        className="form-control pull-left"
                        value={address}
                        onChange={this.onChange}
                        placeholder="Please Enter User Address"
                        rows="2"
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="avatar" className="col-sm-3 col-form-label">
                      Avatar
                    </label>
                    <div className="col-sm-9">
                      <FileBase64
                        multiple={false}
                        className="form-control pull-left"
                        onDone={this.getFiles.bind(this)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Close
            </Button>
            <Button color="danger" onClick={this.editUser}>
              {processing ? "Updating..." : "Update"}
            </Button>{" "}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
const mapDispatchToProps = () => {
  return {
    editUser: (token, id, data) => actionCreater.editUser(token, id, data)
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditUser);
