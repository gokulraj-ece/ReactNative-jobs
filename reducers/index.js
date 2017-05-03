import { combineReducers } from 'redux';

import authReducer from './auth_reducer';
import jobsReducer from './jobs_reducer';
import likedJobs from './likes_reducer';

export default combineReducers({
  auth: authReducer,
  jobs: jobsReducer,
  likes: likedJobs
});
