import APIModel from "../../Models/APIModel";
import axios from "axios";

export const getEvents = (token, search) => {
  return axios.get(APIModel.HOST + "admin/events" + search, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
export const eventDetail = (token, id) => {
  return axios.get(APIModel.HOST + "admin/events/" + id, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const createEvent = (token, data) => {
  return axios.post(APIModel.HOST + "admin/events/create", data, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const editEvent = (token, id, data) => {
  return axios.post(APIModel.HOST + "admin/events/" + id, data, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};

export const deleteEvent = (token, id) => {
  return axios.delete(APIModel.HOST + "admin/events/" + id, {
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
};
