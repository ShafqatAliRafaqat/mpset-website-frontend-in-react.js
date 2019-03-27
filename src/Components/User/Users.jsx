import React, { Component } from "react";
import EditUser from "./EditUser";
import DeleteModal from "../Common/Modals/DeleteModal";
import { connect } from "react-redux";
import * as qs from "query-string";
import {
  Col, Input, InputGroup, InputGroupAddon,
  Button,
} from "reactstrap";
import SimplePagination from "../Common/SimplePagination";
import * as actions from "../../Store/Actions/type";
import * as actionCreater from "../../Store/Actions/UserActions";
import { getSearchUrlFromState } from "../../util/functions";

import { Link } from "react-router-dom";

class Users extends Component {
  state = {
    nick_name: "",
    phone: "",
    email: "",
    avatar: "",

    page: 0,
    totalPages: 0,
    isLoading: true
  };
  get = (search) => {
    this.setState({
      isLoading: true
    });
    let { get, dispatch, user, errorHandler } = this.props;

    get(user.auth.access_token, search)
      .then(res => {
        this.setState({
          page: res.data.meta.current_page,
          totalPages: res.data.meta.last_page
        });

        dispatch({
          type: actions.GET_USERS,
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
    let search = this.props.location.search;

    const params = qs.parse(search);

    for (let key in params) {
      this.setState({
        [key]: params[key]
      });
    }

    this.get(search);
  }
  next = () => {
    let next = this.state.page + 1;
    if (next <= this.state.totalPages) {
      let search = getSearchUrlFromState(this.state);
      this.get(search + "page=" + next);
    }
  };

  previous = () => {
    let previous = this.state.page - 1;
    if (previous > 0) {
      let search = getSearchUrlFromState(this.state);
      this.get(search + "page=" + previous);
    }
  };

  renderEditUser = (isHead = true, model = null) => {
    return (
      <EditUser {...this.props} userData={model}>
        <button type="button" className="dropdown-item"><i className="fas fa-edit"> </i> Edit
        </button>
      </EditUser>
    );
  };

  renderBody = () => {
    if (this.state.isLoading) {
      return;
    }
    const { users } = this.props;

    return users.map(m => {
      return (
        <tr key={m.id}>
          <td>
            <img
              src={m.avatar}
              height="40px"
              width="40px"
              style={{ borderRadius: "30px" }}
              alt="Avatar"
            />
          </td>
          <td>{m.nick_name}</td>
          <td>{m.email}</td>
          <td>{m.phone}</td>
          <td>
            <Link
              to={`/user/detail?id=${m.id}`}
              {...this.props}
              style={{ display: "inline" }}
            >
              View Details
            </Link>
            <div
              className="px-2"
              data-toggle="dropdown"
              style={{ display: "inline" }}
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v"> </i>
            </div>
            <span className="dropdown-menu">
              {this.renderEditUser(false, m)}
              <div className="dropdown-divider" />
              <div className="main-content-container container-fluid px-4">
                <DeleteModal delete={() => this.deleteUser(m.id)} />
              </div>
            </span>
          </td>
        </tr>
      );
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  filter = () => {
    let search = getSearchUrlFromState(this.state);

    this.get(search);
  };

  deleteUser(id) {
    let { user, deleteUser, dispatch, alertify, errorHandler } = this.props;

    deleteUser(user.auth.access_token, id)
      .then(res => {
        dispatch({
          type: actions.DELETE_USER,
          payload: id
        });
        alertify.success(res.data.message);
      })
      .catch(errorHandler);
  }

  render() {
    return (
      <div className="main-content-container container-fluid px-4">
        {/* Page Header  */}
        <div className="page-header row no-gutters py-4">
          <div className="col-md-3 mb-0">
            <h4 className="page-title black">Displaying User List</h4>
          </div>
          <div className="col-md-1">
            <Link to={`/user/create`} className="add-new-link">
              <button className="btn btn-success"> <i className="fa fa-plus"></i> Create User </button>
            </Link>
          </div>
          <Col className="col-md-8 px-2">
            <InputGroup>

              <Input type="text" placeholder="User Name" name="nick_name" onChange={this.onChange} value={this.state.nick_name} />
              <Input type="text" placeholder="Email" name="email" onChange={this.onChange} value={this.state.email} />
              <Input type="text" placeholder="Mobile Phone" name="phone" onChange={this.onChange} value={this.state.phone} />

              {/* <Input type="number" placeholder="Number" name="number" onChange={this.onChange} value={this.state.number} />
                      <Input type="text" placeholder="Cnic" name="cnic" onChange={this.onChange} value={this.state.cnic} />
                      <Input type="text" placeholder="Address" name="address" onChange={this.onChange} value={this.state.address} /> */}
              <InputGroupAddon addonType="append">
                <Button type="button" color="primary" onClick={this.filter}><i className="fa fa-filter" /> Filter</Button>
              </InputGroupAddon>

            </InputGroup>
          </Col>
        </div>

        <div className="row">
          <div className="col-lg-12 mb-4">
            <div className="table-responsive custom-tables">
              <table className="table table-hover table-rounded table-users">
                <thead>
                  <tr>
                    <th>Avatar</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Mobile Phone</th>
                    <th>
                      <i className="fas fa-list mr-2" />Actions
                    </th>
                  </tr>
                </thead>
                <tbody>{this.renderBody()}</tbody>
              </table>
              <SimplePagination next={this.next} previous={this.previous} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.UserReducer.users,
    metaData: state.MetaDataReducer
  };
};

const mapDispatchToProps = () => {
  return {
    get: (token, search) => actionCreater.getUsers(token, search),
    deleteUser: (token, id) => actionCreater.deleteUser(token, id)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
