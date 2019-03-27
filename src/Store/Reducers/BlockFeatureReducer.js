import * as actions from "../Actions/type";

const initSate = {
  blockfeatures: []
};

const BlockFeatureReducer = (state = initSate, action) => {
  switch (action.type) {
    
    case actions.GET_BLOCKFEATURES: {
    

      return { ...state, blockfeatures: action.payload };
    }
    
    case actions.CREATE_BLOCKFEATURE: {
      return { ...state, blockfeatures: [{ ...action.payload }, ...state.blockfeatures] };
    }
    
    case actions.EDIT_BLOCKFEATURE: {
      let model = action.payload;
      let blockfeatures = state.blockfeatures.map(m => {
        if (m.id === model.id) {
          return { ...model }
        }
        return { ...m }
      });
      return { ...state, blockfeatures };
    }
    
    case actions.DELETE_BLOCKFEATURE: {
      let blockfeatures = state.blockfeatures.filter(m => m.id !== action.payload);
      return { ...state, blockfeatures };
    }
    default:
      return state;
  }
};

export default BlockFeatureReducer;
