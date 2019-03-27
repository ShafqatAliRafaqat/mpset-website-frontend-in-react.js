import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import UserSelect from "../User/UserSelect"
import * as actions from "../../Store/Actions/type";
import * as actionCreater from "../../Store/Actions/UserActions";

class CreateUser extends Component {

    initState = {

        title: "",
        body: "",
        payload: {},
        allUsers: false,
        user_id: "",
        users: [],
        processing: false,
        isOpen: false,
    }

    state = {
        ...this.initState
    };

    componentDidMount() {

        let search = this.props.location.search;
        const params = qs.parse(search);
        const { id, name } = params;

        if ((id) && (name)) {
            this.setState({
                users: [
                    { id, first_name: name }
                ]
            })
        }

    }

    onChange = e => {
        this.setState({
            [e.target.name]: (e.target.avatar) ? e.target.avatar[0] : e.target.value
        });
    };

    createUser = () => {

        this.setState({
            processing: true
        });

        let { createUser, dispatch, alertify, user, errorHandler } = this.props;

        let {
            first_name, last_name, nick_name, email, password, address,
            phone, gender, avatar, } = { ...this.state };

        const fd = new FormData();

        fd.append('first_name', first_name);
        fd.append('last_name', last_name);
        fd.append('nick_name', nick_name);
        fd.append('avatar', avatar, (avatar) ? avatar.name : "");
        fd.append('email', email);
        fd.append('password', password);
        fd.append('phone', phone);
        fd.append('address', address);
        fd.append('gender', gender);

        createUser(user.auth.access_token, fd).then(res => {

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

    renderAudiance = () => {
        const { users } = this.state;
        
        return (
            <div className="form-group row">
                <label for="users" className="col-sm-2 col-form-label">Audience</label>
                <div className="col-sm-10">
                    <UserSelect
                        {...this.props}
                        isMulti
                        
                        users={users}
                        onChange={users => this.setState({ users })}
                        placeholder="Please Select Users to Send Notification"
                    
                    />
                </div>
            </div>
        );
    }

    render() {
        // Edited
        // let { title, body, users, allUsers, processing } = this.state;
        let { title, body, processing } = this.state;

        const { label } = this.props;

        return (
            <div className="main-content-container container-fluid px-4">
                {/*  Page Header  */}
                <div className="page-header row no-gutters py-4">
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h3 className="page-title">Add Notification</h3>
                    </div>
                </div>
                {/* <!-- End Page Header --> */}
                {/* <!-- / Start Main Content --> */}
                <div className="row">
                    <div className="col-lg-12">
                        <div className="form-features pt-5 pb-4 mb-4">

                            <div className="form-group row">
                                <label for="title" className="col-sm-2 col-form-label">Title</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control pull-left" name="title" value={title} onChange={this.onChange} placeholder="Please Enter Notification Title" />
                                </div>
                            </div>


                            <div className="form-group row">
                                <label for="body" className="col-sm-2 col-form-label">Body</label>
                                <div className="col-sm-10">
                                    <textarea name="body" id="body" className="form-control pull-left" value={body} onChange={this.onChange} placeholder="Please Enter Notification Body" rows="4"></textarea>
                                </div>
                            </div>

                            {this.renderAudiance()}


                            <div className="form-group row ">
                                <div className="col-12 text-center">
                                    <button className="btn btn-primary" onClick={this.createUser}>{(processing) ? "Creating..." : "Add User"}</button>{' '}
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