import {combineReducers} from 'redux';
import authReducer from '../reducers/auth';
// import profileUser from '../store/reducers/user';

const reducers = combineReducers({
  auth: authReducer,
  // user: profileUser,
});

// users: userDataReducers,

// logout persit
// storage.removeItem('persist:root');
export default reducers;
