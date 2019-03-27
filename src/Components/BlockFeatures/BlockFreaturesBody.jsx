import React, { Component } from "react";
import { connect } from "react-redux";
import * as qs from 'query-string';
import * as actions from "../../Store/Actions/type";
import * as actionCreater from "../../Store/Actions/BlockFeatureActions";
import { getSearchUrlFromState } from '../../util/functions'
import DeleteModal from "../Common/Modals/DeleteModal";
import BlockFeaturesEdit from "./BlockFeaturesEdit";

class BlockFeaturesBody extends Component {
    state = {
        country_code: "",
        country: "",
        features: "",
        all_features: "",

        page: 0,
        totalPages: 0,
        isLoading: true
    };
    get = (search) => {

        this.setState({
            isLoading: true
        });

        // All Variables not used in next line 
        // let { get, dispatch, user, alertify, errorHandler } = this.props;
        let { get, dispatch, user, errorHandler } = this.props;

        get(user.auth.access_token, search).then(res => {

            this.setState({
                page: res.data.meta.current_page,
                totalPages: res.data.meta.last_page,
            });

            dispatch({
                type: actions.GET_BLOCKFEATURES,
                payload: res.data.data
            });

        }).catch(errorHandler).finally(() => {
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

    renderFeatures = (b) => {

        if (b.all_features) {
            return <span className="label label-success label-rounded" style={{margin: "0 1px"}}>All Features</span>
        }

        return b.features.map(f => <span className="label label-success label-rounded" style={{margin: "0 1px"}}>{f}</span>);
    }
    render() {

        if (this.state.isLoading) {
            return false;
        }
        const { blockfeatures } = this.props;

        return blockfeatures.map(m => {

            return (
                <tr key={m.id}>
                    <td>
                        <img src={`https://www.countryflags.io/${m.country_code}/shiny/64.png`} width="31px" height="25px" alt="tk" />
                    </td>
                    <td>
                        {m.country}
                    </td>
                    <td>
                        {this.renderFeatures(m)}
                    </td>
                    <td className="text-muted">
                        <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fas fa-ellipsis-v"> </i>
                        </div>
                        <div className="dropdown-menu">
                            {this.renderEditFeatureButton(false, m)}
                            <div className="dropdown-divider"></div>
                            <DeleteModal delete={() => this.deleteBlockFeature(m.id)} />
                        </div>
                    </td>
                </tr>
            );
        });
    };
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    filter = () => {
        let search = getSearchUrlFromState(this.state);
        this.get(search);
    };
    deleteBlockFeature(id) {

        let { user, deleteBlockFeature, dispatch, alertify, errorHandler } = this.props;

        deleteBlockFeature(user.auth.access_token, id).then(res => {
            dispatch({
                type: actions.DELETE_BLOCKFEATURE,
                payload: id
            });
            alertify.success(res.data.message);
        }).catch(errorHandler);
    }
    renderEditFeatureButton = (isHead = true, model = null) => {
        let { features } = this.props.metaData;
        if (features.length > 0) {
            return <BlockFeaturesEdit {...this.props} features={features} featureData={model} />
        }
    }
}
const mapStateToProps = state => {
    return {
        blockfeatures: state.BlockFeatureReducer.blockfeatures,
        metaData: state.MetaDataReducer
    };
};

const mapDispatchToProps = () => {
    return {
        get: (token, search) => actionCreater.getBlockFeatures(token, search),
        deleteBlockFeature: (token, id) => actionCreater.deleteBlockFeature(token, id),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlockFeaturesBody);