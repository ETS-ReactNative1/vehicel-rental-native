import { ACTION_STRING } from "../actions/actionString";

export const paymentUser = (data) => {
    return {
      type: ACTION_STRING.dataPayment,
      payload: {data},
    };
  };