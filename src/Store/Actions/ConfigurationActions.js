import APIModel from "../../Models/APIModel";
import axios from "axios";

export const getConfigurations = (token) => {
  return axios.get(APIModel.HOST + "user/settings", {
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const createConfiguration = (token,data) => {
  return axios.post(APIModel.HOST + "configurations",data,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const editConfiguration = (token,data) => {
  return axios.post(APIModel.HOST + "admin/settings",data,{
    'headers': {
      
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const deleteConfiguration = (token,id) => {
  return axios.delete(APIModel.HOST + "configurations/"+id,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
