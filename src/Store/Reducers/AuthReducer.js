import * as actions from "../Actions/type";

const initSate = {

    user: (localStorage.mpsetUser) ? JSON.parse(localStorage.mpsetUser) : null,
};

const AuthReducer = (state = initSate, action) => {

    switch (action.type) {

        case actions.LOGIN:
            {

                let user = { ...action.payload.user
                };

                user.auth = { ...action.payload.auth,
                    accessToken: action.payload.access_token
                };

                localStorage.mpsetUser = JSON.stringify(user);
                return { ...state,
                    user
                };
            }

        case actions.EDIT_USER_PROFILE:
            {
                let user = action.payload;

                if(user.id === state.user.id){
                    const fuser = { ...state.user,
                        ...user
                    }
                    localStorage.mpsetUser = null;
                    localStorage.mpsetUser = JSON.stringify(fuser);
                    return {
                        ...state,
                        user: fuser
                    };
                }
                return state;
            }

        case actions.LOGOUT:
            {
                localStorage.mpsetUser = null;
                return { ...state,
                    user: null
                };
            }

        default:
            {
                return state;
            }
    }

};

export default AuthReducer;