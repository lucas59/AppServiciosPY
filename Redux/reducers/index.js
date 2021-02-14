import { combineReducers } from 'redux';
import authReducer from './authReducer';
import locationReducer from './locationReducer'
import infoReducer from './infoReducer'
import tagReducer from './tagsReducer'
import signupReducer from './signupReducer'

const initialStateSignin = {
    email: '',
    name: '',
    phone: '',
    web: '',
    description: ''
}

export default combineReducers({
    auth: authReducer,
    location: locationReducer,
    info: infoReducer,
    tags: tagReducer,
    signup: signupReducer
})