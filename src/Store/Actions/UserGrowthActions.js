import APIModel from "../../Models/APIModel";
import axios from "axios";

export const getUserGrowth = (token, search) => {
    return axios.get(APIModel.HOST + "admin/dashboard/userGrowth" + search, {
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};