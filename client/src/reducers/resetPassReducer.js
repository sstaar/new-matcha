import {
  SEND_RESET_PASSWORD_SUCCESS,
  SEND_RESET_PASSWORD_FAIL,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_SUCCESS
} from "../actions/types";

const initialState = {
  sendingErrors: {},
  sendingSuccess: null,
  errors: {},
  success: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        sendingSuccess: action.payload
      };
    case SEND_RESET_PASSWORD_FAIL:
      return {
        ...state,
        sendingErrors: action.payload
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        errors: action.payload
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.payload
      };
    default:
      return state;
  }
}
