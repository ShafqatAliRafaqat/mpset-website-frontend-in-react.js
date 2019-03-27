import * as actions from "../Actions/type";

const initSate = {
    configuration: []
};

const ConfigurationReducer = (state = initSate, action) => {
  switch (action.type) {
    
    case actions.GET_CONFIGURATIONS: {
      return { ...state, configurations: action.payload };
    }
    
    case actions.CREATE_CONFIGURATION: {
      return { ...state, configurations: [{ ...action.payload }, ...state.configurations] };
    }
    
    case actions.EDIT_CONFIGURATION: {
      let model = action.payload;
      let configurations = state.configurations.map(m => {
        if (m.id === model.id) {
          return { ...model }
        }
        return { ...m }
      });
      return { ...state, configurations };
    }
    default:
      return state;   
  }
};

export default ConfigurationReducer;
