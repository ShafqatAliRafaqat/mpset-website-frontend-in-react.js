import APIModel from "../../Models/APIModel";
import axios from "axios";

export const getReviews = (token, search) => {
    return axios.get(APIModel.HOST + "admin/reviews" + search, {
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};

export const createReviews = (token, params) => {
    return axios.post(APIModel.HOST + "admin/reviews", params, {
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};

export const editReviews = (token, id, data) => {
    return axios.post(APIModel.HOST + "admin/reviews/" + id, data, {
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};


export const deleteReviews = (token, id) => {
    return axios.delete(APIModel.HOST + "admin/reviews/" + id, {
        'headers': {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
};
