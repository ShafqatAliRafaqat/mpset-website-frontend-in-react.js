import * as actions from "../Actions/type";

const initSate = {
  events: []
};

const EventReducer = (state = initSate, action) => {
  switch (action.type) {
    
    case actions.GET_EVENTS: {
      return { ...state, events: action.payload };
    }
    
    case actions.CREATE_EVENT: {
      return { ...state, events: [{ ...action.payload }, ...state.events] };
    }
    
    case actions.EDIT_EVENT: {
      let model = action.payload;
      let events = state.events.map(m => {
        if (m.id === model.id) {
          return { ...model }
        }
        return { ...m }
      });
      return { ...state, events };
    }
    
    case actions.DELETE_EVENT: {
      let events = state.events.filter(m => m.id !== action.payload);
      return { ...state, events };
    }
    default:
      return state;
  }
};

export default EventReducer;
