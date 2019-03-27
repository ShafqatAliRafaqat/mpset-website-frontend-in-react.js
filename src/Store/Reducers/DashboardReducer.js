import * as actions from "../Actions/type";

const initSate = {
    dashboardData: [],
    eventStats: []
};

const DashboardReducer = (state = initSate, action) => {
    switch (action.type) {

        case actions.GET_DASHBOARD: {

            return { ...state, dashboardData: action.payload };
        }
        case actions.GET_EVENT_STATS: {

            return { ...state, eventStats: action.payload };
        }
        default:
            return state;
    }
};

export default DashboardReducer;
