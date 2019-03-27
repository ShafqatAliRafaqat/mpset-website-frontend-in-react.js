import APIModel from "../../Models/APIModel";
import axios from "axios";

export const getUsers = (token, search) => {
  return axios.get(APIModel.HOST + "admin/users" + search, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
export const userDetail = (token, id) => {
  return axios.get(APIModel.HOST + "admin/users/" + id, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};


export const createUser = (token, params) => {
  return axios.post(APIModel.HOST + "admin/users", params, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const editUser = (token, id, data) => {
  return axios.post(APIModel.HOST + "admin/users/" + id, data, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};


export const deleteUser = (token, id) => {
  return axios.delete(APIModel.HOST + "admin/users/" + id, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
