import {ACTION_STRING} from '../../store/actions/actionString';
import {ActionType} from 'redux-promise-middleware';

const initialState = {
  userData: {
    token: null,
    id: null,
  },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: null,
};
const authReducer = (prevState = initialState, action) => {
  // return {...prevState}
  const {authLogin} = ACTION_STRING; //pending, fulfill, rejected
  const {Pending, Fulfilled, Rejected} = ActionType;

  switch (action.type) {
    // case authLogin + pending:
    case authLogin.concat('_', Pending):
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };

    // case authLogin + fulfilled:
    case authLogin.concat('_', Fulfilled):
      const data = action.payload.data;
      const userData = {
        ...prevState.userData,
        token: data.data.token,
        id: data.data.id,
        // user: data.result,
      };
      return {
        ...prevState,
        isPending: false,
        isFulfilled: true,
        userData,
      };

    // case authLogin + rejected:
    case authLogin.concat('_', Rejected):
      const err = action.payload;
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err: null,
      };

    default:
      return prevState;
  }
};

export default authReducer;
