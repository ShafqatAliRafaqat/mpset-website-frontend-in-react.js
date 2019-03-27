import APIModel from "../../Models/APIModel";
import axios from "axios";

export const login = params => {
  return axios.post(APIModel.HOST + "admin/login",params,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json'
    }
  });
};

export const logout = token => {
  return axios.post(APIModel.HOST + "logout",null,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
