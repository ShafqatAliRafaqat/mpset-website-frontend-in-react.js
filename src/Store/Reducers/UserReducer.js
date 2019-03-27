import * as actions from "../Actions/type";

const initSate = {
  users : []
};

const UsersReducer = (state = initSate, action) => {
  switch (action.type) {

    case actions.GET_USERS: {

      return { ...state, users: action.payload };
    }

    case actions.CREATE_USER: {
      return { ...state, users: [{...action.payload},...state.users] };
    }

    case actions.EDIT_USER: {
      let user = action.payload;
      let users = state.users.map( u => {
        if(u.id === user.id){
          return {...user}
        }
        return {...u}
      });
      return { ...state, users: users};
    }
    case actions.USER_DETAIL: {
      let users = state.users.filter( v => v.id !== action.payload);
      return { ...state, users: users };
    }

    case actions.DELETE_USER: {
      let users = state.users.filter( v => v.id !== action.payload);
      return { ...state, users };
    }
    default:{
      return state;
    }
  }
};

export default UsersReducer;
