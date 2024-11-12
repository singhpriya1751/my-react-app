
import { combineReducers } from 'redux';
import blogReducer from './blogSlice';

const rootReducer = combineReducers({
  blog: blogReducer,
});

export default rootReducer;
