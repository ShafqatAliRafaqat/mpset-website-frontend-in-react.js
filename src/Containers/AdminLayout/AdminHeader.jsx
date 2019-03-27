import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

const AdminHeader = props => {

    return (
        <div className="main-navbar sticky-top bg-nav">
            {/* Main Navbar  */}
            <nav className="navbar align-items-stretch navbar-light flex-md-nowrap p-0">
                <div  className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
                    <div className="input-group input-group-seamless ml-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="d-none fas fa-search"></i>
                            </div>
                        </div>
                        <input className="navbar-search form-control" type="hidden" placeholder="Search for something..." aria-label="Search" />
                    </div>
                </div>
                <ul className="navbar-nav flex-row ">
                    <li className="nav-item dropdown">
                        <Link id="nav-date" className="mt-3 nav-link text-nowrap px-3" to="">
                            <i className="flaticon-calendar"></i> <span className="ml-2">{moment().format('h:mm A')}</span>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link id="nav-avatar" className="nav-link dropdown-toggle text-nowrap px-3" data-toggle="dropdown" to="" role="button" aria-haspopup="true" aria-expanded="false">
                            <img className="user-avatar rounded-circle mr-2" src={(props.user.avatar)?props.user.avatar:"assets/images/avatars/0.jpg"} alt="User Avatar" />
                        </Link>
                        <div className="dropdown-menu dropdown-menu-small" aria-labelledby="dropdownMenuLink">

                            <Link className="dropdown-item" to={"/user/profile"}>
                                <i className="text-secondary flaticon-gear "></i> Profile Settings
                            </Link>

                            {/* <Link className="dropdown-item" to="/setting">
                                <i className="text-secondary flaticon-gear "></i> Setting
                            </Link> */}

                            <div className="dropdown-divider"></div>

                            <Link to="/logout" className="dropdown-item text-danger">
                                <i className="fas fa-sign-out-alt"></i> Logout
                            </Link>
                        </div>
                    </li>
                </ul>
                <nav className="nav">
                    <Link to="" className="nav-link nav-link-icon toggle-sidebar d-md-inline d-lg-none text-center" data-toggle="collapse" data-target=".header-navbar" aria-expanded="false" aria-controls="header-navbar">
                        <i className="material-icons">&#xE5D2;</i>
                    </Link>
                </nav>
            </nav>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user
    };
};
export default connect(
    mapStateToProps,
    null
)(AdminHeader);
