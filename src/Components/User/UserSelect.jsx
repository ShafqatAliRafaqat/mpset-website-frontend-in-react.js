import React, { Component } from "react";
import { connect } from "react-redux";
import AsyncSelect from 'react-select/lib/Async';

import * as actions from "../../Store/Actions/UserActions";

class UserSelect extends Component {

  onChange = (m) => {

    let models = m;

    if (!Array.isArray(m)) {
      models = [m];
    }

    let modelIds = models.map(m => ({ id: m.value, first_name: m.label }));

    let { onChange } = this.props;

    onChange(modelIds);
  };

  get = (value, callback) => {

    let { get, user, autoSelect, withAllOption, search, errorHandler } = this.props;

    let s = "?first_name=" + value;

    if (search) {
      s = `?first_name=${value}&${search}`;
    }

    get(user.auth.access_token, s).then(res => {

      let models = res.data.data.map(m => ({ value: m.id, label: m.first_name }));

      if (withAllOption) {
        models.unshift({ value: "", label: "All Users" });
      }

      callback(models);

      if (autoSelect) {
        if (models.length > 0) {
          this.onChange(models[0]);
        }
      }

    }).catch(errorHandler);
  };

  render() {
    const { users } = this.props;
    
    console.log(users);

    return (
      <AsyncSelect
        cacheOptions
        defaultOptions
        defaultValue={(users) ? users.map(m => ({ value: m.id, label: m.first_name })) : []}
        loadOptions={this.get}
        {...this.props}
        onChange={this.onChange}
      />
    );
  }
}

const mapDispatchToProps = () => {
  return {
    get: (token, search) => actions.getUsers(token, search),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserSelect);
