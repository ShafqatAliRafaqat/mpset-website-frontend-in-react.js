import React, { Component } from "react";
import { connect } from "react-redux";
import FileBase64 from 'react-file-base64';

import * as actions from "../../Store/Actions/type";
import * as actionCreater from "../../Store/Actions/UserActions";

class CreateUser extends Component {

    initState = {

        first_name: "",
        last_name: "",
        nick_name: "",
        email: "",
        password: "",
        phone: "",
        avatar: null,
        files: [],
        gender: "",
        address: "",

        processing: false,
        isOpen: false,
    }

    state = {
        ...this.initState
    };

    onChange = e => {
        this.setState({
            [e.target.name]: (e.target.avatar) ? e.target.avatar[0] : e.target.value
        });
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    getFiles(files) {
        this.setState({ file_1: files })
    }

    createUser = () => {

        this.setState({
            processing: true
        });

        let { createUser, dispatch, alertify, user, errorHandler } = this.props;

        let {
            first_name, last_name, nick_name, email, password, address,
            phone, gender, file_1, } = { ...this.state };

        let avatar = file_1.base64;

        const params = {
            first_name, last_name, nick_name, email, password, address,
            phone, gender, avatar,
        };
        createUser(user.auth.access_token, params).then(res => {

            dispatch({
                type: actions.CREATE_USER,
                payload: res.data.data
            });

            this.setState({ ...this.initState });

            alertify.success(res.data.message);

        }).catch(errorHandler).finally(() => {
            this.setState({
                processing: false
            });
        });

    };

    render() {

        let {
            first_name, last_name, nick_name, email, password, address,
            phone, gender, avatar, processing } = this.state;

        const { label } = this.props;

        return (
            <div className="main-content-container container-fluid px-4">
                {/*  Page Header  */}
                <div className="page-header row no-gutters py-4">
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h3 className="page-title">Add New User</h3>
                    </div>
                </div>
                {/* <!-- End Page Header --> */}
                {/* <!-- / Start Main Content --> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-features pt-5 pb-4 mb-4">

                            <div className="form-group row">
                                <label for="first-name" className="col-sm-2 col-form-label">First Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control pull-left" name="first_name" value={first_name} onChange={this.onChange} id="first-name" placeholder="Please Enter User First Name" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="last-name" className="col-sm-2 col-form-label">Last Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control pull-left" name="last_name" value={last_name} onChange={this.onChange} id="last-name" placeholder="Please Enter User Last Name" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="nick-name" className="col-sm-2 col-form-label">Nick Name</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control pull-left" name="nick_name" value={nick_name} onChange={this.onChange} id="nick-name" placeholder="Please Enter User Nick Name" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="gender" value={gender} className="col-sm-2 col-form-label">Gender</label>
                                <div className="col-sm-10">
                                    <select name="gender" onChange={this.onChange} id="gender" className="form-control pull-left" >
                                        <option >Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="email" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control pull-left" name="email" value={email} onChange={this.onChange} id="email" placeholder="Please Enter User Email Address" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="password" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control pull-left" name="password" value={password} onChange={this.onChange} id="password" placeholder="Please Enter User Password" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="phone" className="col-sm-2 col-form-label">Phone</label>
                                <div className="col-sm-10">
                                    <input type="number" className="form-control pull-left" name="phone" value={phone} onChange={this.onChange} id="phone" placeholder="Please Enter User Phone Number" />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label for="address" className="col-sm-2 col-form-label">Address</label>
                                <div className="col-sm-10">
                                    <textarea name="address" id="address" className="form-control pull-left" value={address} onChange={this.onChange} placeholder="Please Enter User Address" rows="4"></textarea>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label for="avatar" className="col-sm-2 col-form-label">Avatar</label>
                                <div className="col-sm-10">
                                    <FileBase64
                                        multiple={false}
                                        className="form-control pull-left"
                                        onDone={this.getFiles.bind(this)}
                                    />
                                </div>
                            </div>

                            <div className="form-group row ">
                                <div className="col-12 text-center">
                                    <button className="btn btn-primary" onClick={this.createUser}>{(processing) ? "Creating..." : "Add User"}</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = () => {
    return {
        createUser: (token, params) => actionCreater.createUser(token, params),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CreateUser);