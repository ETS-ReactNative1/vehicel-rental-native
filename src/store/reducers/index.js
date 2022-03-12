import {combineReducers} from 'redux';
import authReducer from '../reducers/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const reducers = combineReducers({
  auth: authReducer,
  // user: profileUser,
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_AUTH') {
    AsyncStorage.removeItem('persist:root');

    state = undefined;
  }
  return reducers(state, action);
};

// users: userDataReducers,

// logout persit
// storage.removeItem('persist:root');
export default rootReducer;
