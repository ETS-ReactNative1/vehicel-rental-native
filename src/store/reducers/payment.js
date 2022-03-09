import { ACTION_STRING } from "../actions/actionString";
// import { ActionType } from "redux-promise-middleware";

const initialState = {
  dataPayment: null,
};

const paymentReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case ACTION_STRING.dataPayment:
      const data = action.payload;
      console.log("data payment", data);
      return {
        ...data,
      };
    default:
      return prevState;
  }
};

export default paymentReducer;
