import * as actions from "../Actions/type";

const initSate = {
    userGrowth: []
};

const UserGrowthReducer = (state = initSate, action) => {
    switch (action.type) {

        case actions.GET_USER_GROWTH: {

            return { ...state, userGrowth: action.payload };
        }
        default:
        return state;
    }
};

export default UserGrowthReducer;
