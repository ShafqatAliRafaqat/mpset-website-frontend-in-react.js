import React, { Component } from "react";
import BlockFeaturesModel from "./BlockFeaturesModel";
import { connect } from "react-redux";
import * as actionCreater from "../../Store/Actions/BlockFeatureActions";
import SimplePagination from "../Common/SimplePagination";
import BlockFreaturesBody from "./BlockFreaturesBody";

class BlockFeatures extends Component {
    state = {
        country_code: "",
        country: "",
        features: "",
        all_features: "",

        page: 0,
        totalPages: 0,
        isLoading: true
    };
    renderAddFeatureButton = () => {
        let { features } = this.props.metaData;
        if (features.length > 0) {
            return <BlockFeaturesModel {...this.props} features={features} />
        }
    }
    render() {
        // not using these variables
        // let { page, totalPages } = this.state;
        return (
            <div className="main-content-container container-fluid px-4">
                <div className="page-header row no-gutters py-4">
                    <div className="col-12 col-sm-4 text-center text-sm-left mb-0">
                        <h4 className="page-title black">Block Features</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 mb-4">
                        <div className="card card-small crt cr-3">
                            <div className="card-header border-bottom">
                                <h6 className="m-0 d-inline-block float-left">Features Blocked in Countries</h6>
                                <h6 className="m-0 d-inline-block float-right">
                                    {this.renderAddFeatureButton()}
                                </h6>
                            </div>
                            <div className="card-body py-0">
                                <div className="table-responsive">
                                    <table className="table table-hover text-center block-countries">
                                        <thead>
                                            <tr>
                                                <th className="border-top-0">Flag</th>
                                                <th className="border-top-0">Name</th>
                                                <th className="border-top-0">Blocked Features</th>
                                                <th className="border-top-0">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                           <BlockFreaturesBody {...this.props}/>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <SimplePagination next={this.next} previous={this.previous} />
                    </div>
                </div>
            </div>
        )
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
)(BlockFeatures);