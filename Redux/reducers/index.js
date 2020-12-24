import { combineReducers } from 'redux';
import authReducer from './authReducer';
import locationReducer from './locationReducer'
import infoReducer from './infoReducer'
import tagReducer from './tagsReducer'
export default combineReducers({
    auth: authReducer,
    location: locationReducer,
    info: infoReducer,
    tags: tagReducer
})