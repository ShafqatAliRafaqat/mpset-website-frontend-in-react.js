import APIModel from "../../Models/APIModel";
import axios from "axios";

export const getBlockFeatures = (token, search) => {
  return axios.get(APIModel.HOST + "admin/blacklist" + search, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const createBlockFeature = (token, data) => {
  return axios.post(APIModel.HOST + "admin/blacklist", data, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const editBlockFeature = (token, id, data) => {
  return axios.patch(APIModel.HOST + "admin/blacklist/" + id, data, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const deleteBlockFeature = (token, id) => {
  return axios.delete(APIModel.HOST + "admin/blacklist/" + id, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
