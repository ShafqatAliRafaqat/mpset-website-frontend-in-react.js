
import APIModel from "../../Models/APIModel";
import axios from "axios";

export const getMetaData = token => {
  return axios.get(APIModel.HOST + "admin/metaData",{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};

export const getSettings = (token) => {
  return axios.get(APIModel.HOST + "admin/settings",{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};


export const editSettings = (token,settings) => {

  let params = {
    settings: settings
  };

  return axios.put(APIModel.HOST + "admin/settings",params,{
    'headers': {
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer '+token
    }
  });
};
