import { GATE_SELECTED, LOGIN_USER } from "../Actions/actions";

export default function globalReducer(state, action) {
  switch (action.type) {
    case GATE_SELECTED:
      return {
        ...state,
        gateName: action.payload.gateName,
      };
    case LOGIN_USER:
      return {
        ...state,
        loginUser: action.payload.userName,
      };

    default:
      return state;
  }
}
