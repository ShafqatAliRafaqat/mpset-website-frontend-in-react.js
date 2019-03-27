import React, { Component } from "react";
import { Link } from "react-router-dom";
import nav from '../../_nav';

class AdminSideMenu extends Component {

  render() {

    return (
      <aside className="main-sidebar col-12 col-md-3 col-lg-2 px-0">
        <div className="main-navbar">
          <nav className="navbar align-items-stretch navbar-light bg-white flex-md-nowrap p-0">
            <Link className="navbar-brand w-100 mr-0" to="">
              <div className="d-table m-auto">
                <img id="main-logo" className="d-inline-block align-top mr-1 mt-4" style={{ maxWidth: '175px' }} src="/assets/images/Logo.png" alt=" logo" />
              </div>
            </Link>
            <Link to="" className="toggle-sidebar d-sm-inline d-md-none d-lg-none">
              <i className="material-icons">&#xE5C4;</i>
            </Link>
          </nav>
        </div>
        <form className="main-sidebar__search w-100 border-right d-sm-flex d-md-none d-lg-none">
          <div className="input-group input-group-seamless ml-3">
            <div className="input-group-prepend">
              <div className="input-group-text"> <i className="d-none fas fa-search"></i> </div>
            </div>
            <input className="navbar-search form-control" type="hidden" placeholder="Search for something..." aria-label="Search" />
          </div>
        </form>
        <div className="nav-wrapper mt-2">
          <ul className="nav flex-column">

            {nav.items.map((n, i) => (
              <li className="nav-item" key={i} >
                <Link className="nav-link " to={n.url}>
                  <i className={n.icon} />
                  <span>{n.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  }
}


export default AdminSideMenu;
