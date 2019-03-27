import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreater from "../../Store/Actions/ConfigurationActions";
import * as actions from "../../Store/Actions/type";
import FileBase64 from 'react-file-base64';
import APIModel from "../../Models/APIModel";
class Configuration extends Component {

  state = {
    ...this.props,
    files: [],
    isLoading: true,
    config: null,
    processing: false,
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.avatar ? e.target.avatar[0] : e.target.value
    });
  };
  getFiles(files) {
    this.setState({ file_1: files })
  }
  get = () => {
    this.setState({
      isLoading: true
    });

    let { getConfigurations, dispatch, user, errorHandler } = this.props;

    getConfigurations(user.auth.access_token).then(res => {

      const config = res.data.data;

      let data = {};

      config.forEach(e => {
        data = { ...data, [e.key]: e.value }
      });

      this.setState({
        ...data,
        avatar_img: APIModel.URL + data.default_avatar,
        default_avatar: null
      });

      dispatch({
        type: actions.GET_CONFIGURATIONS,
        payload: config
      });

    }).catch(errorHandler).finally(() => {
      this.setState({
        isLoading: false
      });
    });
  };


  editConfiguration = () => {

    this.setState({
      processing: true
    });

    let { editConfiguration, dispatch, alertify, user, errorHandler } = this.props;

    let { maximum_seats_per_table, minimum_seats_per_table, home_payment_fee, buy_ins_fee,
      re_buy_ins_fee, file_1, invite_friend_sms_text, invite_friend_email_text,
      invitations_per_day, notification_status } = { ...this.state };

    let default_avatar = file_1.base64;
    const fd = new FormData();

    fd.append('maximum_seats_per_table', maximum_seats_per_table);
    fd.append('minimum_seats_per_table', minimum_seats_per_table);
    fd.append('home_payment_fee', home_payment_fee);
    fd.append('buy_ins_fee', buy_ins_fee);
    fd.append('re_buy_ins_fee', re_buy_ins_fee);
    if (default_avatar) {
      fd.append('default_avatar', default_avatar);
    }

    fd.append('notification_status', notification_status);
    fd.append('invite_friend_sms_text', invite_friend_sms_text);
    fd.append('invite_friend_email_text', invite_friend_email_text);
    fd.append('invitations_per_day', invitations_per_day);


    editConfiguration(user.auth.access_token, fd).then(res => {

      dispatch({
        type: actions.EDIT_CONFIGURATION,
        payload: res.data.data
      });

      this.setState({ ...this.state });

      alertify.success(res.data.message);

    }).catch(errorHandler).finally(() => {
      this.setState({
        processing: false
      });
    });

  };


  componentWillMount() {
    this.get();
  }

  render() {

    const { maximum_seats_per_table, minimum_seats_per_table, home_payment_fee, buy_ins_fee,
      re_buy_ins_fee, default_avatar, invite_friend_sms_text, invite_friend_email_text,
      invitations_per_day, notification_status, avatar_img, processing } = this.state;

    return (
      <div className="main-content-container container-fluid px-4">
        {/* <!-- Page Header --> */}
        <div className="page-header row no-gutters py-4">
          <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
            <h3 className="page-title">App Default Configurations</h3>
          </div>
        </div>
        {/* <!-- End Page Header --> */}
        {/* <!-- / Start Main Content --> */}
        <div className="row">
          <div className="col-lg-12">
            <div className="form-features pt-4 pb-2 mb-4">

              <div className="row">
                <div className="col-sm-8">
                  <div className="form-group row">
                    <label
                      for="max-seats"
                      className="col-sm-3 col-form-label"
                    >
                      Maximum Seats
                      </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        className="form-control pull-left"
                        name="maximum_seats_per_table"
                        id="max-seats"
                        placeholder="Please Enter Maximum Seats Per Table"
                        value={maximum_seats_per_table}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="min-seats"
                      className="col-sm-3 col-form-label"
                    >
                      Minimum Seats
                      </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        className="form-control pull-left"
                        name="minimum_seats_per_table"
                        id="min-seats"
                        placeholder="Please Enter Minimum Seats Per Table"
                        value={minimum_seats_per_table}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label
                      for="home-payment"
                      className="col-sm-3 col-form-label"
                    >
                      Home Payment
                      </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        className="form-control pull-left"
                        name="home_payment_fee"
                        id="home-payment"
                        placeholder="Please Enter Fee Amount For Home Payment"
                        value={home_payment_fee}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="buy-in" className="col-sm-3 col-form-label">
                      Buy-In fee
                      </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        className="form-control pull-left"
                        name="buy_ins_fee"
                        id="buy-in"
                        placeholder="Please Enter Fee Amount For Buy-In"
                        value={buy_ins_fee}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label for="re-buy-in" className="col-sm-3 col-form-label">
                      Re-Buy-In fee
                      </label>
                    <div className="col-sm-9">
                      <input
                        type="number"
                        className="form-control pull-left"
                        name="re_buy_ins_fee"
                        id="re-buy-in"
                        placeholder="Please Enter Fee Amount For Re-Buy-In"
                        value={re_buy_ins_fee}
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>


                <div className="col-sm-4">
                  <div className="form-group text-center">
                    <label
                      for="default-image"
                      className="col-sm-12 col-form-label"
                    >
                      Default Avatar
                      </label>
                    <img
                      htmlFor="default-image"
                      src={avatar_img}
                      height="180"
                      className="rounded-circle img img-responsive"
                      alt="default avater"
                    />
                    <div className="col-sm-12">
                      <FileBase64
                        multiple={false}
                        className="form-control pull-left"
                        onDone={this.getFiles.bind(this)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <label for="sms-text" className="col-sm-2 col-form-label">
                  Notifications
                  </label>
                <div className="col-sm-10">
                  <select
                    name="notification_status"
                    id="notification"
                    className="form-control pull-left"
                    value={notification_status}
                    onChange={this.onChange}
                  >
                    <option value="0">Disabled</option>
                    <option value="1">Enabled</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <label for="sms-text" className="col-sm-2 col-form-label">
                  Invite Friend – Sms Text
                  </label>
                <div className="col-sm-10">
                  <textarea
                    name="invite_friend_sms_text"
                    id="sms-text"
                    className="form-control pull-left"
                    placeholder="Please Enter Invite Friend Sms Text"
                    rows="4"
                    value={invite_friend_sms_text}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label for="email-text" className="col-sm-2 col-form-label">
                  Invite Friend – Email Text
                  </label>
                <div className="col-sm-10">
                  <textarea
                    name="invite_friend_email_text"
                    id="email-text"
                    className="form-control pull-left"
                    placeholder="Please Enter Invite Friend Email Text"
                    rows="4"
                    value={invite_friend_email_text}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  for="invitation-day"
                  className="col-sm-2 col-form-label"
                >
                  Invitations Per Day
                  </label>
                <div className="col-sm-10">
                  <input
                    type="number"
                    className="form-control pull-left"
                    name="invitations_per_day"
                    id="invitation-day"
                    placeholder="Please Enter Amount Invitations Per Day"
                    value={invitations_per_day}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <div className="form-group row ">
                <div className="col-12 text-center">
                  <button className="btn btn-primary" onClick={this.editConfiguration}>{(processing) ? "Updating..." : "Update Configuration"}</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    metaData: state.MetaDataReducer,
  };
};

const mapDispatchToProps = () => {
  return {
    getConfigurations: token => actionCreater.getConfigurations(token),
    editConfiguration: (token, params) => actionCreater.editConfiguration(token, params),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configuration);
