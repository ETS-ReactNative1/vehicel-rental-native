import { ACTION_STRING } from "../actions/actionString";

export const profileUser = (data) => {
    return {
      type: ACTION_STRING.userLogin,
      payload: { data },
    };
  };