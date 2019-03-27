import * as actions from "../Actions/type";

const initSate = {
  features: [],
};

const MetaDataReducer = (state = initSate, action) => {

  switch (action.type) {

    case actions.GET_META_DATA: {

      const { features } = action.payload;

      return {
        ...state,
        features
      };
    }
    default:
      return state;
  }
  
};

export default MetaDataReducer;
