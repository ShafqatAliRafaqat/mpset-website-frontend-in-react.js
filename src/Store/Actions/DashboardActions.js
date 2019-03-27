import APIModel from "../../Models/APIModel";
import axios from "axios";

export const getDashboard = (token) => {
    return axios.get(APIModel.HOST + "admin/dashboard/stats", {
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};
export const getCountryUsers = (token) => {
    return axios.get(APIModel.HOST + "admin/dashboard/countryUsers", {
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};
export const getEventStats = (token, search) => {
    return axios.get(APIModel.HOST + "admin/dashboard/eventStats" + search, {
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};