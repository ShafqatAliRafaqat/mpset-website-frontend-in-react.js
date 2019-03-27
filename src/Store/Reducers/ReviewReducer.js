import * as actions from "../Actions/type";

const initSate = {
    reviews: []
};

const ReviewReducer = (state = initSate, action) => {
    switch (action.type) {

        case actions.GET_REVIEW: {

            return { ...state, reviews: action.payload };
        }

        case actions.CREATE_REVIEW: {
            return { ...state, reviews: [{ ...action.payload }, ...state.reviews] };
        }

        case actions.EDIT_REVIEW: {
            let review = action.payload;
            let reviews = state.reviews.map(u => {
                if (u.id === review.id) {
                    return { ...review }
                }
                return { ...u }
            });
            return { ...state, reviews: reviews };
        }

        case actions.DELETE_REVIEW: {
            let reviews = state.reviews.filter(v => v.id !== action.payload);
            return { ...state, reviews };
        }
        default:
            return state;
    }
};

export default ReviewReducer;
