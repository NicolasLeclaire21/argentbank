import { GET_USER, LOG_OUT, UPDATE_USER } from "../app/actions";

const initialState = {
  isLogIn: false,
  user: {},
};
const userReducer = (state = initialState, action) => {
  console.log (action.type)
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isLogIn: true,
        user: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          userName: action.payload.username
        },
      };
    case LOG_OUT:
      return {
        initialState,
      };
    default:
      return state;
  }
};

export default userReducer;