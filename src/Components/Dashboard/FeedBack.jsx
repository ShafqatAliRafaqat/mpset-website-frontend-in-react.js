import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreater from "../../Store/Actions/ReviewAction";
import * as qs from 'query-string';
import StarRatingComponent from 'react-star-rating-component';
import * as actions from "../../Store/Actions/type";

class FeedBack extends Component {
    state = {
        ...this.props,
        rating: "",
        comment: "",
        created_at: "",
        first_name: "",
        avatar: null,

        page: 0,
        totalPages: 0,
        isLoading: true
    };
    get = (search) => {

        this.setState({
            isLoading: true
        });

        let { get, dispatch, user,  errorHandler } = this.props;

        get(user.auth.access_token, search).then(res => {

            this.setState({
                page: res.data.meta.current_page,
                totalPages: res.data.meta.last_page,
                reviews: res.data.data,
            });

            dispatch({
                type: actions.GET_REVIEW,
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
    renderReviews = () => {

        const { reviews } = this.state;
        if (!reviews) {
            return;
        }
        return reviews.map(m => {
            return (
                <div className="d-flex flex-row comment-row mt-0">
                    <div className="p-2">
                        <img src={m.reviewer.avatar} alt="user" width="50" className="rounded-circle" />
                    </div>
                    <div className="comment-text w-100">
                        <h6 className="font-medium mb-0">{m.reviewer.first_name}</h6>
                        <span className="m-b-15 d-block mb-1">{m.comment}</span>
                        <div className="comment-footer">
                            <span className="text-muted pr-4 float-right mb-1">{m.created_at}</span>
                            <StarRatingComponent
                                name="rate"
                                editing={false}
                                renderStarIcon={() => <i className="fas fa-star"></i>}
                                starCount={5}
                                value={m.rating}
                            />
                        </div>
                    </div>
                </div>
            );
        });
    }
    render() {

        return (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card card-small h-100">
                    <div className="card-header border-bottom">
                        <h6 className="m-0">Reviews Feed</h6>
                    </div>
                    <div className="comment-widgets p-3" >
                        {this.renderReviews()}
                    </div>
                    {/* <div className="card-footer">
                    </div> */}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        metaData: state.MetaDataReducer
    };
};
const mapDispatchToProps = () => {
    return {
        get: (token, search) => actionCreater.getReviews(token, search),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeedBack);
